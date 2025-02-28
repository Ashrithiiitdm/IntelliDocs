import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    File_id: {
        type: String,
    },
    
    owner: {
        type: String,
    },

    content: String,

    type: String,
    
    filename: String,

    created_at: {
        type: Date,
        default: Date.now()
    },

    SharedLink:[
        {
            type: String,
            ref: 'SharedLink'
        }
    ],
    FileBrief: {
        type: JSON,
        default: {}
    }

});

export const File = mongoose.models.File || mongoose.model('File', FileSchema);