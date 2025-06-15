import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegistrationPage: React.FC = () => {
  return (
    <div className="app">
      <div className="content">
        <Header />
        <main className="registration-container">
          <h2>Создание аккаунта</h2>
          <form>
            <div className="form-group">
              <label>Имя</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Фамилия</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input type="password" required />
            </div>
            <div className="form-group">
              <label>Подтвердите пароль</label>
              <input type="password" required />
            </div>
            <button type="submit" className="submit-btn">
              Зарегистрироваться
            </button>
          </form>
          <div className="login-link">
            Уже есть аккаунт? <Link to="/">Войти</Link>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RegistrationPage;
