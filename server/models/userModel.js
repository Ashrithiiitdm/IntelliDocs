import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    user_name: {
        type: String,
        required: true,
        unique: true
    }

}, { minimize: false });

export const Users = mongoose.models.Users || mongoose.model('Users', userSchema);