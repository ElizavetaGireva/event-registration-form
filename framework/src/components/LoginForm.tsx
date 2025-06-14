import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCredentials,
    setLoading,
    loginSuccess
} from '../store/authSlice';
import type { RootState } from '../store';

const LoginForm = () => {
    // 1. Получаем доступ к хранилищу
    const dispatch = useDispatch();

    // 2. Вытаскиваем нужные данные из состояния
    const { username, password, loading } = useSelector(
        (state: RootState) => state.auth
    );

    // 3. Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Запускаем индикатор загрузки
        dispatch(setLoading(true));

        // Имитация запроса к серверу
        setTimeout(() => {
            if (username === 'test@mail.ru' && password === '12345') {
                dispatch(loginSuccess()); // Успешный вход!
            }
            dispatch(setLoading(false));
        }, 2000);
    };

    // 4. Обновляем поля формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCredentials({
            username: e.target.value,
            password, // Пароль пока не меняем
            remember: false
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={username}
                onChange={handleChange}
                placeholder="Email"
            />
            <button disabled={loading}>
                {loading ? 'Загрузка...' : 'Войти'}
            </button>
        </form>
    );
};