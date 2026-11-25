import { Schema, model, Document } from "mongoose";

export interface IPaintingModel extends Document {
    title: string;
    description: string;
    price: number;
    imageName: string;
}

const paintingSchema = new Schema<IPaintingModel>(
    {
        title: {
            type: String,
            required: [true, "Missing title"],
            minlength: [2, "Title too short"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Missing description"],
        },
        price: {
            type: Number,
            required: [true, "Missing price"],
            min: [0, "Price cannot be negative"],
        },
        imageName: {
            type: String,
            required: [true, "Missing image name"],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const PaintingModel = model<IPaintingModel>(
    "Painting",
    paintingSchema,
    "paintings"
);