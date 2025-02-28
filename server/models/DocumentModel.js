import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    Document_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    content: Object,
    document_name: String,
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
    DocumentBrief: {
        type: JSON,
        default: {}
    }

})
export const Users = mongoose.models.SharedLinkSchema;