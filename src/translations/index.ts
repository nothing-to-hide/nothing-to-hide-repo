import { DE } from "./de/DE";
import { EN } from "./en/EN";

export const translations = { DE, EN };

export type Language = keyof typeof translations;
