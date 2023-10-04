import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth';
import minSweeperReducer from './slice/minesweeperSlice';
import tictactoeReducer from './slice/tictactoeSlice';
import tictactoeVsComputer from './slice/tictactoeVsComputerSlice';

export const store = configureStore({
    reducer:{
        auth:authReducer,
        mineSweeper:minSweeperReducer,
        tictactoe: tictactoeReducer,
        tictactoeVsComputer:tictactoeVsComputer,
    }
});