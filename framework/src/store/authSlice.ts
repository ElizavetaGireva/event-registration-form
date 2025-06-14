import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Описываем тип состояния
interface AuthState {
    username: string;
    password: string;
    remember: boolean;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// 2. Начальное состояние
const initialState: AuthState = {
    username: '',
    password: '',
    remember: false,
    isAuthenticated: false,
    loading: false,
    error: null
};

// 3. Создаем "срез" (slice)
const authSlice = createSlice({
    name: 'auth', // Уникальное имя
    initialState, // Начальное состояние
    reducers: {
        // Экшен для обновления логина/пароля
        setCredentials: (state, action: PayloadAction<{
            username: string;
            password: string;
            remember: boolean;
        }>) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.remember = action.payload.remember;
        },

        // Экшен для показа/скрытия загрузки
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        // Экшен для ошибок
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        // Экшен при успешном входе
        loginSuccess: (state) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },

        // Экшен для выхода
        logout: (state) => {
            state.isAuthenticated = false;
        }
    }
});

// Экспортируем экшены
export const {
    setCredentials,
    setLoading,
    setError,
    loginSuccess,
    logout
} = authSlice.actions;

// Экспортируем редьюсер (обработчик состояния)
export default authSlice.reducer;