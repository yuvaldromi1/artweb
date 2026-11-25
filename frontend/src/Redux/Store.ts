import { configureStore } from "@reduxjs/toolkit";
import { paintingSlice } from "./PaintingSlice";
import { userSlice } from "./UserSlice";

export const store = configureStore({
    reducer: {
        paintings: paintingSlice.reducer,
        user: userSlice.reducer
    }
});

export type AppState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
