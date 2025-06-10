import { validateForm } from './index';

describe('validateForm', () => {
    test('valid credentials', () => {
        const result = validateForm('user@example.com', 'Password123');
        expect(result.valid).toBe(true); // исправлено result.value на result.valid
    });

    test('invalid email format', () => {
        const result = validateForm('invalid-email', 'Password123');
        expect(result.valid).toBe(false); // исправлено result.value на result.valid
        expect(result.message).toContain('Логин'); // исправлено toGenteln на toContain и текст сообщения
    });
});