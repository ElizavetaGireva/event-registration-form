import React from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import PetalsAnimation from './components/PetalsAnimation';

const App: React.FC = () => {
    return (
        <div className="app">
            <PetalsAnimation />
            <Header />
            <main>
                <LoginForm />
            </main>
            <Footer />
        </div>
    );
};

export default App;