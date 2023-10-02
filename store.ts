import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth';
import minSweeperReducer from './slice/minesweeperSlice';

export const store = configureStore({
    reducer:{
        auth:authReducer,
        mineSweeper:minSweeperReducer,
    }
});