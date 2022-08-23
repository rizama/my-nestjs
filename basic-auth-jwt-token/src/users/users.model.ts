import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export interface User extends mongoose.Document {
    _id: string;
    username: string;
    password: string;
}

export abstract class UserModel {
    // Model name === Collection Name, it will add 's' in last word
    // so the collection that will be process is 'users'
    public static USER_MODEL_NAME = 'user';
}