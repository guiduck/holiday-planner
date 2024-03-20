/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",

  // moduleNameMapper: {
  //   "@/components(.*)$": ["<rootDir>/src/components$1"],
  //   "@/utils(.*)$": ["<rootDir>/src/utils$1"],
  //   "@/hooks(.*)$": ["<rootDir>/src/hooks$1"],
  // },

  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/components/ui/(.*)$": "<rootDir>/src/components/ui/$1",
    "^@/lib/utils/(.*)$": "<rootDir>/src/lib/utils/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@/models/(.*)$": "<rootDir>/src/models/$1",
    "^@/stores/(.*)$": "<rootDir>/src/stores/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
  },
  moduleDirectories: [
    "node_modules",
    "<rootDir>/src/lib/utils",
    "<rootDir>/src/components/ui",
  ],
  testEnvironment: "jsdom",
  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/node_modules/"],
  setupFiles: ["./jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
