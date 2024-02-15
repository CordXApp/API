import { Schema, model } from 'mongoose';
import { UserDomainSchema } from './dom.schema';
import { UserSignatureSchema } from './sig.schema';

const CordXUserSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    globalName: {
        type: String,
        required: true
    },
    owner: {
        type: Boolean,
        required: false,
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
    support: {
        type: Boolean,
        required: false,
        default: false
    },
    banned: {
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
        default: false
    },
    active_domain: {
        type: String,
        required: false,
        default: 'none'
    },
    domains: {
        type: [UserDomainSchema],
        required: false,
        default: []
    },
    signature: {
        type: UserSignatureSchema,
        required: false,
        default: null
    }
})

export default model('cordxUser', CordXUserSchema)