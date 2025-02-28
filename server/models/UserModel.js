import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    User_id: {
        type: mongoose.Schema.Types.ObjectId,
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