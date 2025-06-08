// Массив цветочных символов
const flowers = ['🌸', '🌼', '🌺'];

// Функция для генерации лепестков
function createPetals() {
    const petalCount = 15;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Случайный цветок из массива
        const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
        petal.innerHTML = randomFlower;

        // Позиционирование
        petal.style.left = Math.random() * 100 + 'vw';

        // Анимация
        const duration = Math.random() * 15 + 15; // 15-30 секунд
        const delay = Math.random() * 10;
        const size = Math.random() * 1.5 + 1; // 1-2.5rem
        const opacity = Math.random() * 0.6 + 0.4; // 0.4-1.0
        const colorHue = Math.floor(Math.random() * 360);

        petal.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        petal.style.fontSize = `${size}rem`;
        petal.style.opacity = opacity;
        petal.style.color = `hsl(${colorHue}, 70%, 65%)`;

        // Добавляем лепесток на страницу
        document.body.appendChild(petal);
    }
}

// Функция для валидации формы
function validateForm(username, password) {
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
function showMessage(message, isError = true) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = `message ${isError ? 'error' : 'success'}`;
    messageEl.style.display = 'block';

    // Автоматическое скрытие сообщения через 5 секунд
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

// Функция для сохранения данных
function saveCredentials(username, remember) {
    if (remember) {
        // Сохраняем в localStorage
        localStorage.setItem('savedUsername', username);
        showMessage('Данные сохранены в localStorage', false);
    } else {
        // Удаляем сохраненные данные, если пользователь не хочет сохранять
        localStorage.removeItem('savedUsername');
    }
}

// Функция для обработки отправки формы
function handleSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    const submitBtn = document.getElementById('submitBtn');

    // Показать анимацию загрузки
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Имитация загрузки
    setTimeout(() => {
        // Проверяем введенные данные
        const validation = validateForm(username, password);

        if (validation.valid) {
            // Сохраняем данные, если нужно
            saveCredentials(username, remember);
            showMessage('Вход выполнен успешно!', false);
        } else {
            // Показать сообщение об ошибке
            showMessage(validation.message);

            // Анимация встряски
            document.getElementById('loginForm').classList.add('shake');
            setTimeout(() => {
                document.getElementById('loginForm').classList.remove('shake');
            }, 500);
        }

        // Скрыть анимацию загрузки
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 1500);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Создаем лепестки сразу при загрузке
    createPetals();

    // Загружаем сохраненные данные, если они есть
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
        document.getElementById('remember').checked = true;
    }

    // Обработчик отправки формы
    document.getElementById('loginForm').addEventListener('submit', handleSubmit);

    // Обработчик для кнопки регистрации
    document.getElementById('signupLink').addEventListener('click', (e) => {
        e.preventDefault();
        showMessage('Регистрация временно недоступна', true);
    });

    // Обработчики для кнопок социальных сетей
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showMessage('Вход через социальные сети временно недоступен', true);
        });
    });
});