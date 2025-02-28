import cloudinary from "../utils/cloudinary.js";
import { Users } from "../models/UserModel.js";

export const uploadFile = async (req, res) => {

    try {
        const { file } = req.files;
        const {User_id} = req.body;

        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        let fileUrl = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });

        const user = await Users.findOneAndUpdate({User_id}, {}) 

        return res.status(200).json({
            message: "File uploaded successfully",
            fileUrl: fileUrl.secure_url,
        });

    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error occured while uploading file",
        });
    }


};
