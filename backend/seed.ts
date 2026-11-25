import mongoose from "mongoose";
import { IPaintingModel, PaintingModel } from "./src/3-models/painting-model";

const samplePaintings: IPaintingModel[] = [
    {
        title: "Morning Reflection",
        description: "An expressive watercolor portrait of a woman with striking green eyes and a thoughtful gaze.",
        price: 200,
        imageName: "1.jpg",
    } as IPaintingModel,
    {
        title: "Weathered Wisdom",
        description: "A detailed mixed-media sketch of an elderly man, highlighting the texture of age and the intensity of a soulful expression.",
        price: 210,
        imageName: "2.jpg",
    } as IPaintingModel,
    {
        title: "Passion in Motion",
        description: "A dynamic sketch of a dancer in a vibrant red dress, capturing the energy and flow of the movement.",
        price: 120,
        imageName: "3.jpg",
    } as IPaintingModel,
    {
        title: "Café Conversations",
        description: "An intimate scene of two figures at a table, rendered with loose, expressive lines that suggest a quiet, shared moment.",
        price: 260,
        imageName: "4.jpg",
    } as IPaintingModel,
    {
        title: "The Cyclist's Pause",
        description: "A charming depiction of a figure standing with their bicycle, blending urban life with a touch of colorful solitude.",
        price: 350,
        imageName: "5.jpg",
    } as IPaintingModel,
    {
        title: "Bridge Over Colors",
        description: "An impressionist-inspired landscape featuring a bridge over water, alive with vibrant strokes of green, blue, and yellow light.",
        price: 300,
        imageName: "6.jpg",
    } as IPaintingModel,
    {
        title: "Gaze of Time",
        description: "A raw and textured close-up portrait using bold, warm colors to convey deep emotion and resilience.",
        price: 260,
        imageName: "7.jpg",
    } as IPaintingModel,
    {
        title: "Quiet Thought",
        description: "A moody and introspective sketch of a boy lost in thought, characterized by soft shading and expressive contours.",
        price: 350,
        imageName: "8.jpg",
    } as IPaintingModel,
    {
        title: "The Teacher.",
        description: "A bold and colorful figure in a theatrical stance, contrasting bright hues with dark, defining ink lines.",
        price: 300,
        imageName: "9.jpg",
    } as IPaintingModel,
    {
        title: "Solitude in Amber",
        description: "A delicate figure study rendered in warm, earthy tones, capturing a moment of stillness and grace.",
        price: 220,
        imageName: "10.jpg",
    } as IPaintingModel,
    {
        title: "Profile in Blue",
        description: "A serene side-profile portrait, highlighting the beautiful contrast between the subject's red hair and the cool blue tones of her garment.",
        price: 700,
        imageName: "11.jpg",
    } as IPaintingModel,
];

async function seedDatabase(): Promise<void> {
    try {
        await mongoose.connect("mongodb://localhost:27017/artweb");
        console.log("✓ Connected to MongoDB");

        await PaintingModel.deleteMany({});
        console.log("✓ Cleared existing paintings");

        const result = await PaintingModel.insertMany(samplePaintings);
        console.log(`✓ Database seeded with ${result.length} paintings`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error: any) {
        console.error("✗ Error seeding database:", error.message);
        process.exit(1);
    }
}

seedDatabase();
