import express, { Request, Response, Router } from "express";
import { service } from "../5-services/service";
import { StatusCode } from "../3-models/enums";
import { authMiddleware } from "../7-middleware/auth-middleware";

class Controller {
    public router: Router = express.Router();

    public constructor() {
        // Auth routes (public)
        this.router.post("/api/auth/register", this.register);
        this.router.post("/api/auth/login", this.login);

        // Paintings routes (protected)
        this.router.get("/api/paintings", this.getAllPaintings);
        this.router.get("/api/paintings/:id", this.getOnePainting);
        this.router.post("/api/paintings", authMiddleware.authenticate, this.addPainting);
        this.router.put("/api/paintings/:id", authMiddleware.authenticate, this.updatePainting);
        this.router.delete("/api/paintings/:id", authMiddleware.authenticate, this.deletePainting);
    }

    // ============ AUTH HANDLERS ============
    private register = async (request: Request, response: Response) => {
        const user = request.body;
        const token = await service.register(user);
        response.status(StatusCode.Created).json(token);
    };

    private login = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        const token = await service.login(email, password);
        response.status(StatusCode.OK).json(token);
    };

    // ============ PAINTING HANDLERS ============
    private getAllPaintings = async (request: Request, response: Response) => {
        const paintings = await service.getAllPaintings();
        response.status(StatusCode.OK).json(paintings);
    };

    private getOnePainting = async (request: Request, response: Response) => {
        const id = request.params.id as string;
        const painting = await service.getOnePainting(id);
        response.status(StatusCode.OK).json(painting);
    };

    private addPainting = async (request: Request, response: Response) => {
        const painting = request.body;

        // Add the uploaded filename to the painting object
        if ((request as any).file) {
            painting.imageName = (request as any).file.filename;
        }

        const newPainting = await service.addPainting(painting);
        response.status(StatusCode.Created).json(newPainting);
    };

    private updatePainting = async (request: Request, response: Response) => {
        const id = request.params.id as string;
        const painting = request.body;

        // Add the uploaded filename to the painting object if a new file was uploaded
        if ((request as any).file) {
            painting.imageName = (request as any).file.filename;
        }

        const updatedPainting = await service.updatePainting(id, painting);
        response.status(StatusCode.OK).json(updatedPainting);
    };

    private deletePainting = async (request: Request, response: Response) => {
        const id = request.params.id as string;
        await service.deletePainting(id);
        response.status(StatusCode.NoContent).send();
    };
}

export const controller = new Controller();
