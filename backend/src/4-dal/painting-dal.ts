import { PaintingModel, IPaintingModel } from "../3-models/painting-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

class PaintingDAL {
    public async getAllPaintings(): Promise<IPaintingModel[]> {
        return PaintingModel.find().exec();
    }

    public async getOnePaintingById(id: string): Promise<IPaintingModel> {
        const painting = await PaintingModel.findById(id).exec();
        if (!painting) {
            throw new ResourceNotFoundError(parseInt(id));
        }
        return painting;
    }

    public async addPainting(painting: IPaintingModel): Promise<IPaintingModel> {
        return PaintingModel.create(painting);
    }

    public async deletePainting(id: string): Promise<void> {
        const result = await PaintingModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new ResourceNotFoundError(parseInt(id));
        }
    }

    public async updatePainting(id: string, painting: Partial<IPaintingModel>): Promise<IPaintingModel> {
        const result = await PaintingModel.findByIdAndUpdate(id, painting, { new: true }).exec();
        if (!result) {
            throw new ResourceNotFoundError(parseInt(id));
        }
        return result;
    }
}

export const paintingDAL = new PaintingDAL();
