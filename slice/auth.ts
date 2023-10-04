import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
  }

  interface User {
    name: string;
    email:string;
    userId:string;
  }

  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  const authSlice:any = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      logoutSuccess: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      },
    },
  });

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;