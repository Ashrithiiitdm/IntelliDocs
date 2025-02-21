import jwt from 'jsonwebtoken';
import { Users } from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';


// Sign a token for a logged in user
const regToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET);

};


// Login is based on user_name and password
export const loginUser = async (req, res) => {

    try {
        const { user_name, password } = req.body;

        // Check if the user_name is valid
        const existingUser = await Users.findOne({ user_name });

        if (!existingUser) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        const validPass = await bcrypt.compare(password, existingUser.password);

        if (!validPass) {
            return res.status(400).json({
                message: 'Invalid password',
            });
        }

        // Sign a token for the user
        const token = regToken(existingUser._id);

        return res.status(200).json({
            message: 'User logged in successfully',
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


export const regUser = async (req, res) => {
    try{
        const { name, email, password, user_name} = req.body;

        // Check if the user_name is valid
        const user_nameExists = await Users.findOne({ user_name });

        if(user_nameExists){
            return res.status(400).json({
                message: 'User name already exists',
            });
        }

        // Check if the email is valid
        if(!validator.isEmail(email)){
            return res.status(400).json({
                message: 'Please enter a valid email',
            });
        }

        // Check if the email is already registered
        const emailExists = await Users.findOne({email});
        if(emailExists){
            return res.status(400).json({
                message: 'Email already exists',
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            user_name,
        });

        await newUser.save();

        const token = regToken(newUser._id);

        return res.status(200).json({
            message: 'User registered successfully',
            token,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: err.message,
        });
    }
};

