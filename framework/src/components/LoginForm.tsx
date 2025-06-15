import React, { useState, useEffect, useRef } from 'react';
import SocialButtons from './SocialButtons';

interface LoginFormProps {
  onMessage: (message: string, isError: boolean) => void;
  onShake: () => void;
  shouldShake: boolean; // Новый пропс для анимации встряски
}

const LoginForm: React.FC<LoginFormProps> = ({ onMessage, onShake, shouldShake }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRemember(true);
    }
  }, []);

  const validateForm = (username: string, password: string) => {
    if (!username || username.length < 3 || username.indexOf('@') === -1) {
      return {
        valid: false,
        message: 'Логин должен содержать символ @ и быть длиннее 3 символов',
      };
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return {
        valid: false,
        message: 'Пароль должен содержать минимум 6 символов, одну цифру и одну заглавную букву',
      };
    }

    const validCredentials = {
      username: 'user@example.com',
      password: 'Password123',
    };

    if (username !== validCredentials.username || password !== validCredentials.password) {
      return {
        valid: false,
        message: 'Неверный логин или пароль',
      };
    }

    return { valid: true };
  };

  const saveCredentials = (username: string, remember: boolean) => {
    if (remember) {
      localStorage.setItem('savedUsername', username);
    } else {
      localStorage.removeItem('savedUsername');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const validation = validateForm(username, password);

      if (validation.valid) {
        saveCredentials(username, remember);
        onMessage('Вход выполнен успешно!', false);
      } else {
        onMessage(validation.message || 'Ошибка!', true);
        onShake(); // Вызываем функцию для встряски формы
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onMessage('Регистрация временно недоступна', true);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Авторизация</h2>
        <p>Войдите, чтобы продолжить</p>
      </div>

      <SocialButtons
        onSocialClick={() => onMessage('Вход через социальные сети временно недоступен', true)}
      />

      <div className="divider">
        <span>или</span>
      </div>

      <form
        id="loginForm"
        onSubmit={handleSubmit}
        className={shouldShake ? 'shake' : ''}
        ref={formRef}
      >
        <div className="form-group">
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            id="username"
            className="input-field"
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Логин"
            aria-required="true"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Пароль"
            aria-required="true"
            required
          />
        </div>

        <div className="remember-me">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            aria-checked={remember}
            aria-label="Сохранить сессию"
          />
          <label htmlFor="remember">Сохранять сессию</label>
        </div>

        <button
          type="submit"
          className={`login-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
          aria-label="Войти в систему"
        >
          Войти
        </button>
      </form>

      <div className="signup-link">
        Ещё нет аккаунта?{' '}
        <a href="#" onClick={handleSignupClick}>
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
