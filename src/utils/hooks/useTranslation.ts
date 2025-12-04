import { useSettings } from "../../context/SettingsContext";
import { translations } from "../../translations";
import { ITranslation } from "../../types/translations";

/**
 * Custom hook to provide translations based on the current language setting.
 *
 * This hook retrieves the current language from the `SettingsContext` and
 * returns the corresponding translations object.
 *
 * Note: This hook can only be used within a `SettingsProvider` component,
 * as it relies on the `useSettings` context.
 *
 * @returns {{ localize: ITranslation }} The localize property which holds the complete translation
 *  object for the currently selected language.
 */
export const useTranslation = (): { localize: ITranslation } => {
  const { settings } = useSettings();
  const localize = translations[settings.language] ?? translations.DE;
  return { localize };
};
