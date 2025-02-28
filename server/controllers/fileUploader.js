import cloudinary from "../utils/cloudinary.js";
import { Users } from "../models/UserModel.js";
import { Documents } from "../models/DocumentModel.js";
import { File } from "../models/FileModel.js";
import mammoth from 'mammoth';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync, unlinkSync } from 'fs';
import { LastSeen } from "../models/LastSeenModel.js";


export const fileUploader = async (req, res) => {

    try {
        //const { file } = req.file;
        console.log(req.body);
        console.log(req.file);
        const { email } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const User = await Users.findOne({ email });
        console.log(User);
        const User_id = User.User_id;
        console.log(User_id);

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
                document_name: req.file.originalname,
                owner: User_id,
            })
            await newDoc.save();

            unlinkSync(req.file.path);

            const user = await Users.findOne({ User_id });

            user.Document_id.push(newDoc.Document_id);
            await user.save();

            const lastSeen = await new LastSeen({
                User_id,
                Document_id: newDoc.Document_id,
                permission: 'owner',
                LastSeen: Date.now(),
            });



            await lastSeen.save();


            // return res.status(200).json({
            //     message: "Document uploaded successfully",
            //     newDoc,
            //     filename: req.file.originalname,
            // });

        }
        console.log(req.file.originalname);
        const filename = req.file.originalname.split('.').slice(0, -1).join('.');
        let fileUrl = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });

        const fileUpload = await new File({
            File_id: uuidv4(),
            content: fileUrl.secure_url,
            owner: User_id,
            type: ext,
            filename: filename,
        });

        await fileUpload.save();

        const user = await Users.findOne({ User_id });
        console.log(user);
        user.File_id.push(fileUpload.File_id);
        await user.save();

        const lastSeen = await new LastSeen({
            User_id,
            File_id: fileUpload.File_id,
            permission: 'owner',
            LastSeen: Date.now(),
        });
        console.log(lastSeen);
        await lastSeen.save();

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

export const renameFile = async (req, res) => {

    try {
        const { User_id, File_id } = req.params;
        const { newFilename } = req.body;

        const file = await File.findOne({ File_id });
        if (!file) {
            return res.status(404).json({
                message: "File not found",
            });
        }

        const permission = await LastSeen.findOne({ User_id, File_id });
        //console.log(permission);
        if (permission.permission !== 'owner' && permission.permission !== 'edit') {
            return res.status(403).json({
                message: "You do not have permission to rename this file",
            });
        }

        file.filename = newFilename;
        const newFile = await file.save();

        return res.status(200).json({
            message: "File renamed successfully",
            newFile,
        });


    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error occured while renaming file",
        });
    }

};

export const deleteFile = async (req, res) => {
    try {
        const { User_id, File_id } = req.params;

        const file = await File.findOne({ File_id });
        if (!file) {
            return res.status(404).json({
                message: "File not found",
            });
        }

        const permission = await LastSeen.findOne({ User_id, File_id });
        if (permission.permission !== 'owner') {
            await LastSeen.deleteOne({ User_id, File_id });
            return res.status(200).json({
                message: "File deleted successfully",
            });
        }

        await LastSeen.deleteMany({ File_id });
        await File.deleteOne({ File_id });
        return res.status(200).json({
            message: "File deleted successfully",
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error occured while deleting file",
        });
    }
};