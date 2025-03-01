import jwt from 'jsonwebtoken';
import { Users } from '../models/UserModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { File } from '../models/FileModel.js';
import { LastSeen } from '../models/LastSeenModel.js';

// Sign a token for a logged in user
const regToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET);

};

export const getUser = async (req, res) => {
    const {user_name} = req.query;
    const user = await Users.findOne({user_name: user_name});
    const user_id = user.User_id;
    return res.status(200).json({
        message: "User returned successfully",
        user_id: user_id,
    });
}


// // Login is based on user_name and password
// export const loginUser = async (req, res) => {

//     try {
//         const { user_name, password } = req.body;

//         // Check if the user_name is valid
//         const existingUser = await Users.findOne({ user_name });

//         if (!existingUser) {
//             return res.status(400).json({
//                 message: 'User not found',
//             });
//         }

//         const validPass = await bcrypt.compare(password, existingUser.password);

//         if (!validPass) {
//             return res.status(400).json({
//                 message: 'Invalid password',
//             });
//         }

//         // Sign a token for the user
//         const token = regToken(existingUser._id);

//         return res.status(200).json({
//             message: 'User logged in successfully',
//             token,

//         });

//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: err.message,
//         });
//     }

// };


export const regUser = async (req, res) => {
    try {
        console.log("Inside regUsre");
        const { email, password, user_name } = req.body;

        console.log(req.body);

        // Check if the user_name is valid
        const user_nameExists = await Users.findOne({ user_name });
        //console.log(user_nameExists);
        if (user_nameExists) {
            return res.status(400).json({
                message: 'User name already exists',
            });
        }

        // Check if the email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: 'Please enter a valid email',
            });
        }

        // Check if the email is already registered
        const emailExists = await Users.findOne({ email });
        //console.log(emailExists);
        if (emailExists) {
            return res.status(400).json({
                message: 'Email already exists',
            });
        }

        const user_id = uuidv4();
        // Hash the password
        const newUser = new Users({
            User_id: user_id,
            email,
            password: "",
            user_name,
        });

        await newUser.save();

        console.log(newUser);

        const token = regToken(newUser._id);

        return res.status(200).json({
            message: 'User registered successfully',
            token,
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
        });
    }
};

export const getFiles = async (req, res) => {
    const { User_id } = req.params;

    try {
        const user = await Users.findOne({ User_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const fileIds = user.File_id;
        let fileInfo = [];

        // Use `Promise.all` to wait for all async operations
        await Promise.all(
            fileIds.map(async (file_id) => {
                const file = await File.findOne({ File_id: file_id });
                if (!file) return;

                let fileName = file.filename;
                let fileUrl = file.content;
                let fileType = file.type;
                let ownerRow = await Users.findOne({ User_id: file.owner });
                let owner = ownerRow.user_name;
                // ✅ Await the query to get collaborators
                const users = await LastSeen.find({ File_id: file_id, permission: 'edit' });
                let collaborators = users.map(user => user.user_name);

                // ✅ Await the queries for modified_at and permission
                const lastSeenEntry = await LastSeen.findOne({ File_id: file_id, User_id });
                let modified_at = lastSeenEntry ? lastSeenEntry.LastSeen : null;
                let permission = lastSeenEntry ? lastSeenEntry.permission : null;

                fileInfo.push({
                    fileName,
                    fileUrl,
                    fileType,
                    owner,
                    collaborators,
                    modified_at,
                    permission,
                });
            })
        );

        return res.status(200).json({ files: fileInfo });

    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Error fetching files',
        });
    }
};

