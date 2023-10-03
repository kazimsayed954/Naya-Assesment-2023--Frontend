import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth';
import minSweeperReducer from './slice/minesweeperSlice';
import tictactoeReducer from './slice/tictactoeSlice';

export const store = configureStore({
    reducer:{
        auth:authReducer,
        mineSweeper:minSweeperReducer,
        tictactoe: tictactoeReducer,
    }
});