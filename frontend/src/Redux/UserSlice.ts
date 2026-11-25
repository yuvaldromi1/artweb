import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

const initialState = null as UserModel | null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser: (_, action: PayloadAction<UserModel>): UserModel | null => action.payload,
        logoutUser: (): UserModel | null => null
    }
});
