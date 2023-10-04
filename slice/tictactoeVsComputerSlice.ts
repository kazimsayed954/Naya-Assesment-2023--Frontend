import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    board: Array(9).fill(null),
    playerTurn: true, // true for player, false for computer
    winner: null,
  };

  const tictactoeVsComputerSlice = createSlice({
    name: 'tictactoe',
    initialState,
    reducers: {
        setBoard:(state,action)=>{
            state.board = action.payload;
        },
        setPlayerTurn:(state,action)=>{
            state.playerTurn=action.payload;
        },
        setWinner:(state,action)=>{
            state.winner=action.payload;
        }
    }
   });

   export const { setBoard,setPlayerTurn,setWinner } = tictactoeVsComputerSlice.actions;

   export default tictactoeVsComputerSlice.reducer;

  