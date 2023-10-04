  import { createSlice } from '@reduxjs/toolkit';
  const initialState = {
    roomId: '',
    name: '',
    piece: '',
    gameState: Array(9).fill(null),
    turn: true,
    statusMessage: '',
    showModal: false,
    end: false,
  };

  const tictactoeSlice = createSlice({
    name: 'tictactoe',
    initialState,
    reducers: {
      setRoomId: (state, action) => {
        state.roomId = action.payload;
      },
      setName: (state, action) => {
        state.name = action.payload;
      },
      setPiece: (state, action) => {
        state.piece = action.payload;
      },
      setGameState: (state, action) => {
        state.gameState = action.payload;
      },
      setTurn: (state, action) => {
        state.turn = action.payload;
      },
      setStatusMessage: (state, action) => {
        state.statusMessage = action.payload;
      },
      setShowModal: (state, action) => {
        state.showModal = action.payload;
      },
      setEnd: (state, action) => {
        state.end = action.payload;
      },
    },
  });
  
  export const {
    setRoomId,
    setName,
    setPiece,
    setGameState,
    setTurn,
    setStatusMessage,
    setShowModal,
    setEnd 
} = tictactoeSlice.actions;
  
  export default tictactoeSlice.reducer;