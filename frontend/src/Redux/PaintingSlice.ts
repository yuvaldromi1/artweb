import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { PaintingModel } from "../Models/PaintingModel";

const initialState: PaintingModel[] = [];

export const paintingSlice = createSlice({
    name: "paintings",
    initialState,
    reducers: {
        initPaintings: (_, action: PayloadAction<PaintingModel[]>) => action.payload,
        addPainting: (state, action: PayloadAction<PaintingModel>) => {
            state.push(action.payload);
        },
        updatePainting: (state, action: PayloadAction<PaintingModel>) => {
            const index = state.findIndex((p: PaintingModel) => p._id === action.payload._id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deletePainting: (state, action: PayloadAction<string>) => {
            return state.filter((p: PaintingModel) => p._id !== action.payload);
        }
    }
});
