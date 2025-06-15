import React from 'react';

const SocialButtons: React.FC<{ onSocialClick: () => void }> = ({ onSocialClick }) => {
  return (
    <div className="social-login">
      <button className="social-btn google" aria-label="Войти через Google" onClick={onSocialClick}>
        <i>G</i>
      </button>
      <button
        className="social-btn facebook"
        aria-label="Войти через Facebook"
        onClick={onSocialClick}
      >
        <i>F</i>
      </button>
      <button
        className="social-btn twitter"
        aria-label="Войти через Twitter"
        onClick={onSocialClick}
      >
        <i>T</i>
      </button>
    </div>
  );
};

export default SocialButtons;
