import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

export default mongoose.model('oauth', AuthSchema)