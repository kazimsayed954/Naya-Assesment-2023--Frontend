  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    board: [],
    gameOver: false,
    score: 0,
  };

  const minesweeperSlice = createSlice({
    name: "minesweeper",
    initialState,
    reducers: {
      setBoard: (state, action) => {
        state.board = action.payload;
      },
      setScore: (state, action) => {
        state.score = action.payload;
      },
      setGameOver: (state, action) => {
        state.gameOver = action.payload;
      },
    },
  });

export const { setBoard, setScore, setGameOver } = minesweeperSlice.actions;

export default minesweeperSlice.reducer;