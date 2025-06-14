import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <main>
                <div className="login-container">
                    <h2>Компонент формы в разработке</h2>
                    <p>Скоро здесь будет форма авторизации</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;