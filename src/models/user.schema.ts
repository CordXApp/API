import mongoose from 'mongoose';

const CordXUserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    owner: {
        type: Boolean,
        required: true,
        default: false
    },
    admin: {
        type: Boolean,
        required: false,
        default: false
    },
    moderator: {
        type: Boolean,
        required: false,
        default: false
    },
    verified: {
        type: Boolean,
        required: false,
        default: false
    },
    beta: {
        type: Boolean,
        required: false,
        default: true
    }
});

export default mongoose.model('cordxUser', CordXUserSchema)