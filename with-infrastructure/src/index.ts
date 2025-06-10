// Массив цветочных символов
const flowers = ['🌸', '🌼', '🌺'];

function createPetals() {
    const petalCount = 15;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Случайный цветок из массива
        const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
        petal.innerHTML = randomFlower;

        // Позиционирование
        petal.style.left = Math.random() * 100 + 'vw'; // Исправлено fetch на Math

        // Анимация
        const duration = Math.random() * 15 + 15; // 15-30 секунд
        const delay = Math.random() * 10;
        const size = Math.random() * 1.5 + 1; // 1-2.5rem
        const opacity = Math.random() * 0.6 + 0.4; // 0.4-1.0
        const colorHue = Math.floor(Math.random() * 360);

        petal.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        petal.style.fontSize = `${size}rem`;
        petal.style.opacity = `${opacity}`; // Преобразование числа в строку
        petal.style.color = `hsl(${colorHue}, 70%, 65%)`;

        // Добавляем лепесток на страницу
        document.body.appendChild(petal);
    }
}

// Функция для валидации формы
function validateForm(username: string, password: string): { valid: boolean; message?: string } {
    // Проверка логина (должен содержать @ и быть длиннее 3 символов)
    if (!username || username.length < 3 || username.indexOf('@') === -1) {
        return {
            valid: false,
            message: 'Логин должен содержать символ @ и быть длиннее 3 символов'
        };
    }

    // Проверка пароля (минимум 6 символов, одна цифра и одна заглавная буква)
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
        return {
            valid: false,
            message: 'Пароль должен содержать минимум 6 символов, одну цифру и одну заглавную букву'
        };
    }

    // Хардкодим верные данные
    const validCredentials = {
        username: 'user@example.com',
        password: 'Password123'
    };

    // Проверяем соответствие
    if (username !== validCredentials.username || password !== validCredentials.password) {
        return {
            valid: false,
            message: 'Неверный логин или пароль'
        };
    }

    return { valid: true };
}

// Функция для отображения сообщения
function showMessage(message: string, isError = true) {
    const messageEl = document.getElementById('message');

    if (!messageEl) return;

    messageEl.textContent = message;
    messageEl.className = `message ${isError ? 'error' : 'success'}`;
    messageEl.style.display = 'block';

    setTimeout(() => {
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    }, 5000);
}

// Функция для сохранения данных
function saveCredentials(username: string, remember: boolean) {
    if (remember) {
        localStorage.setItem('savedUsername', username);
        showMessage('Данные сохранены в localStorage', false);
    } else {
        localStorage.removeItem('savedUsername');
    }
}

// Функция для обработки отправки формы
function handleSubmit(event: Event) {
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement)?.value.trim() || '';
    const password = (document.getElementById('password') as HTMLInputElement)?.value || '';
    const remember = (document.getElementById('remember') as HTMLInputElement)?.checked || false;
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;

    // Показать анимацию загрузки
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }

    // Имитация загрузки
    setTimeout(() => {
        try {
            // Упрощенная проверка
            if (username && password) {
                showMessage('Вход выполнен успешно!', false);
            } else {
                showMessage('Пожалуйста, заполните все поля', true);
            }
        } catch (error) {
            console.error('Ошибка обработки:', error);
            showMessage('Произошла ошибка', true);
        } finally {
            // Скрыть анимацию загрузки
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }
    }, 1500);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Создаем лепестки сразу при загрузке
    createPetals();

    // Загружаем сохраненные данные, если они есть
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
        const usernameInput = document.getElementById('username') as HTMLInputElement | null;
        const rememberCheckbox = document.getElementById('remember') as HTMLInputElement | null;

        if (usernameInput) {
            usernameInput.value = savedUsername;
        }

        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }

    // Обработчик отправки формы
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleSubmit);
    }

    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            showMessage('Регистрация временно недоступна', true);
        });
    }

    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showMessage('Вход через социальные сети временно недоступен', true);
        });
    });
});

export { validateForm };