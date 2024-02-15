import { Schema } from 'mongoose'

export const UserSignatureSchema: Schema = new Schema(
    {
        key: { type: String, required: true }
    },
    {
        timestamps: true
    }
)