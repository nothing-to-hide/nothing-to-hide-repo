import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jsdom",
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  transform: {
    ...tsJestTransformCfg,
  },
};