import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    File_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    

    content: String,

    type: String,
    
    filename: String,

    created_at: {
        type: Date,
        default: Date.now
    },

    SharedLink:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SharedLink'
        }
    ],
    FileBrief: {
        type: JSON,
        default: {}
    }

});

export const File = mongoose.models.File || mongoose.model('File', FileSchema);