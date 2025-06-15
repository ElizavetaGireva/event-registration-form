import { useEffect } from 'react';

const PetalsAnimation = () => {
  useEffect(() => {
    const flowers = ['🌸', '🌼', '🌺'];
    const petals: HTMLDivElement[] = [];

    const createPetals = () => {
      const petalCount = 15;
      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
        petal.innerHTML = randomFlower;

        petal.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 10;
        const size = Math.random() * 1.5 + 1;
        const opacity = Math.random() * 0.6 + 0.4;
        const colorHue = Math.floor(Math.random() * 360);

        petal.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        petal.style.fontSize = `${size}rem`;
        petal.style.opacity = `${opacity}`;
        petal.style.color = `hsl(${colorHue}, 70%, 65%)`;

        document.body.appendChild(petal);
        petals.push(petal);
      }
    };

    createPetals();

    return () => {
      petals.forEach((petal) => {
        if (petal.parentNode === document.body) {
          document.body.removeChild(petal);
        }
      });
    };
  }, []);

  return null;
};

export default PetalsAnimation;
