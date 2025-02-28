import mongoose from 'mongoose';

const LastSeenSchema = new mongoose.Schema({

    User_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    File_id : {
        type: mongoose.Schema.Types.ObjectId,
    },
    LastSeen: {
        type: Date,
        default: Date.now()
    },

    permission: Array 


});

export const LastSeen = mongoose.models.LastSeen || mongoose.model('LastSeen', LastSeenSchema); 