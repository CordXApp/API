import { Schema } from 'mongoose'

export const UserDomainSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        txtContent: { type: String, required: true },
        verified: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
)