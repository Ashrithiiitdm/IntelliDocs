import cloudinary from "../utils/cloudinary.js";
import { Users } from "../models/UserModel.js";
import { Documents } from "../models/DocumentModel.js";
import { File } from "../models/FileModel.js";
import mammoth from 'mammoth';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync, unlinkSync } from 'fs';


export const fileUploader = async (req, res) => {

    try {
        //const { file } = req.file;
        console.log(req.body);
        console.log(req.file);
        const { User_id } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const ext = req.file.originalname.split(".").pop();

        if (ext === 'docx') {
            const docBuffer = readFileSync(req.file.path);
            const result = await mammoth.extractRawText({ buffer: docBuffer });
            const deltaContent = {
                ops: [
                    { insert: result.value + '\n' }
                ]
            }
            const newDoc = new Documents({
                Document_id: uuidv4(),
                content: deltaContent,
            })
            await newDoc.save();

            unlinkSync(req.file.path);

            const user = await Users.findOne({ User_id });

            user.Document_id.push(newDoc.Document_id);
            await user.save();

            return res.status(200).json({
                message: "Document uploaded successfully",
                newDoc,
                filename: req.file.originalname,
            });

        }
        console.log(req.file.originalname);
        const filename = req.file.originalname.split('.').slice(0, -1).join('.');
        let fileUrl = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });

        const fileUpload = await new File({
            File_id: uuidv4(),
            content: fileUrl.secure_url,
            type: ext,
            filename: filename,
        });

        await fileUpload.save();

        const user = await Users.findOne({ User_id });
        console.log(user);
        user.File_id.push(fileUpload.File_id);
        await user.save();

        return res.status(200).json({
            message: "File uploaded successfully",
            fileUrl: fileUrl.secure_url,
            filename: req.file.originalname,
        });

    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error occured while uploading file",
        });
    }


};
