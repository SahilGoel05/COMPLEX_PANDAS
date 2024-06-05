module.exports = {
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/styleMock.js',
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coverageReporters: ["text", "text-summary", "lcov"],
};