import { createSlice } from "@reduxjs/toolkit";
import gameDataList from "../src/utitlities/GAME_DATA";

const initialState = {
  gameData:gameDataList
};

const gameList = createSlice({
  name: "gameList",
  initialState,
  reducers: {
    setGameList: (state, action) => {
      state.gameData = action.payload;
    },
   
  },
});

export const { setGameList } = gameList.actions;

export default gameList.reducer;