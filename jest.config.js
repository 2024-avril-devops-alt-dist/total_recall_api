module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
};
