import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    Document_id: {
        type: String,
    },
    content: Object,
    document_name: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    SharedLink:[
        {
            type: String,
            ref: 'SharedLink'
        }
    ],
    DocumentBrief: {
        type: JSON,
        default: {}
    }

})
export const Documents = mongoose.models.Documents || mongoose.model('Documents', DocumentSchema);