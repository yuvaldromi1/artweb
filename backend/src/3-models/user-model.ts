import { Document, Schema, model } from "mongoose";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    roleId: number;
    createdAt?: Date;
}

const userSchema = new Schema<IUserModel>(
    {
        firstName: {
            type: String,
            required: [true, "Missing first name"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Missing last name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Missing email"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Missing password"],
        },
        phone: {
            type: String,
            trim: true,
        },
        roleId: {
            type: Number,
            required: true,
            default: 2,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const UserModel = model<IUserModel>("User", userSchema, "users");
