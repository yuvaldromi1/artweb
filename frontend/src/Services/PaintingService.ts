import axios from "axios";
import { PaintingModel } from "../Models/PaintingModel";
import { paintingSlice } from "../Redux/PaintingSlice";
import { store } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";

class PaintingService {

    // Get all paintings from backend:
    public async getAllPaintings(): Promise<PaintingModel[]> {

        // If we already have the paintings: 
        if (store.getState().paintings.length > 0) {
            return store.getState().paintings;
        }

        // Fetch paintings:
        const response = await axios.get<PaintingModel[]>(appConfig.paintingsUrl);

        // Extract paintings: 
        const paintings = response.data;

        // Same:
        const action = paintingSlice.actions.initPaintings(paintings); // Action Creator
        store.dispatch(action);

        // Return paintings:
        return paintings;
    }

    // Get one painting from backend: 
    public async getOnePainting(id: string): Promise<PaintingModel> {

        // If we have this painting in the global state - return it: 
        const painting = store.getState().paintings.find((p: PaintingModel) => p._id === id);
        if (painting) return painting;

        // Fetch painting: 
        const response = await axios.get<PaintingModel>(appConfig.paintingsUrl + id);

        // Extract painting: 
        const dbPainting = response.data;

        // Return painting: 
        return dbPainting;
    }

    // Add painting to backend:
    public async addPainting(painting: PaintingModel): Promise<void> {

        const myFormData = new FormData(); // Contains only strings and Files
        myFormData.append("title", painting.title);
        myFormData.append("description", painting.description);
        myFormData.append("price", painting.price.toString());

        // imageName is now a File object from the form
        if (painting.imageName instanceof File) {
            myFormData.append("imageName", painting.imageName);
        }

        // Send painting: 
        const response = await axios.post<PaintingModel>(appConfig.paintingsUrl, myFormData);

        // Extract returned painting:
        const dbPainting = response.data;

        // Add this painting to the global state: 
        const action = paintingSlice.actions.addPainting(dbPainting);
        store.dispatch(action);
    }

    // Update painting:
    public async updatePainting(painting: PaintingModel): Promise<void> {

        const myFormData = new FormData(); // Contains only strings and Files
        myFormData.append("title", painting.title);
        myFormData.append("description", painting.description);
        myFormData.append("price", painting.price.toString());

        // imageName is now a File object from the form
        if (painting.imageName instanceof File) {
            myFormData.append("imageName", painting.imageName);
        }

        // Send painting: 
        const response = await axios.put<PaintingModel>(appConfig.paintingsUrl + painting._id, myFormData);

        // Extract returned painting:
        const dbPainting = response.data;

        // Update global state: 
        const action = paintingSlice.actions.updatePainting(dbPainting);
        store.dispatch(action);
    }

    // Delete one painting from backend: 
    public async deletePainting(id: string): Promise<void> {

        // Delete the painting from backend: 
        await axios.delete(appConfig.paintingsUrl + id);

        // Delete from global state: 
        const action = paintingSlice.actions.deletePainting(id);
        store.dispatch(action);
    }
}

export const paintingService = new PaintingService();
