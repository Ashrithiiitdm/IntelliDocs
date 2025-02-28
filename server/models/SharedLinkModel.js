import mongoose from 'mongoose';

const SharedLinkSchema = new mongoose.Schema({
    LinkId: String,
    Permisson : Array

})
export const Users = mongoose.models.SharedLinkSchema;