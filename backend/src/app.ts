import cors from "cors";
import express from "express";
import path from "path";
import multer from "multer";
import { appConfig } from "./2-utils/db-config";
import { controller } from "./6-controllers/controller";
import { errorsMiddleware } from "./7-middleware/errors-middleware";
import mongoose from "mongoose";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

class App {

    public async start(): Promise<void> {
        try {
            await mongoose.connect(appConfig.mongodbConnectionString);
            const server = express();
            server.use(cors());
            server.use(express.json());

            // Serve static files from uploads folder
            server.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

            // Use multer middleware for painting routes
            server.use("/api/paintings", upload.single("imageName"));

            server.use(controller.router);
            server.use(errorsMiddleware.routeNotFound);
            server.use(errorsMiddleware.catchAll);
            server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
        }
        catch (err: any) {
            console.error(err);
        }
    }
}

const app = new App();
app.start();
