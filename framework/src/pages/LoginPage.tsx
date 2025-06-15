import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import PetalsAnimation from '../components/PetalsAnimation';

const LoginPage: React.FC = () => {
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [shakeForm, setShakeForm] = useState(false);

  const handleMessage = (text: string, isError: boolean) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 500);
  };

  return (
    <div className="login-page">
      <PetalsAnimation />
      <Header />
      <main>
        {message && (
          <div className={`message ${message.isError ? 'error' : 'success'}`}>{message.text}</div>
        )}

        <LoginForm
          onMessage={handleMessage}
          onShake={handleShake}
          shouldShake={shakeForm} // Добавляем пропс для встряски
        />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
