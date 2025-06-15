import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardPage: React.FC = () => {
  const { username } = useSelector((state: RootState) => state.auth);

  return (
    <div className="dashboard-page">
      <Header />
      <main>
        <h2>Добро пожаловать, {username}!</h2>
        <div className="dashboard-content">
          <div className="event-card">
            <h3>Конференция React Developers 2023</h3>
            <p>Дата: 15-17 ноября 2023</p>
            <p>Место: Москва, Крокус Экспо</p>
            <button className="details-btn">Подробнее</button>
          </div>
          {/* Добавьте больше карточек мероприятий */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
