import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string;
  password: string;
  remember: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// store/authSlice.ts
const initialState: AuthState = {
  username: '',
  password: '',
  remember: false,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ username: string; password: string; remember: boolean }>,
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.remember = action.payload.remember;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setLoading, setError, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
