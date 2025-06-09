// Подключаем необходимые модули Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000; // Можно изменить на любой свободный порт

// Создаем HTTP сервер
const server = http.createServer((request, response) => {
    // 1. Определяем путь к запрашиваемому файлу
    let filePath = path.join(
        __dirname,
        'src',
        request.url === '/' ? 'index.html' : request.url
    );

    // 2. Определяем MIME-тип (Content-Type) по расширению файла
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.ts':
            contentType = 'text/typescript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // 3. Читаем файл с диска
    fs.readFile(filePath, (error, content) => {
        if (error) {
            // Обработка ошибок
            if (error.code === 'ENOENT') {
                // Файл не найден
                fs.readFile(path.join(__dirname, 'src', '404.html'), (err, notFoundContent) => {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(notFoundContent || 'Page not found');
                });
            } else {
                // Другие ошибки сервера
                response.writeHead(500);
                response.end(`Server Error: ${error.code}`);
            }
        } else {
            // Успешный ответ
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

// Запускаем сервер
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});