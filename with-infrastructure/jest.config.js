module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css)$': 'identity-obj-proxy'
    },
    testEnvironmentOptions: {
        url: 'http://localhost/'
    }
};