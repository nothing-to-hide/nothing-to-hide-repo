/**
 * @file General.ts
 * @description Represents the structure of general translations used in the application.
 */
export type GeneralTranslation = {
  common: {
    currentLanguage: string;
    open: string;
    close: string;
    back: string;
    proceed: string;
    retry: string;
    save: string;
    cancel: string;
    from: string;
    You: string;
    great: string;
    maxGamePoints: string;
  };
  settings: {
    title: string;
    audioEnabled: string;
    musicVolume: string;
    soundEffectsVolume: string;
    chooseLanguage: string;
  };
  legal: {
    titleImpressum: string;
    titleGeneral: string;
    textGeneral: string;
    titleContact: string;
    textContact: string;
    titlePrivacy: string;
    textPrivacy: string;
    titleLinks: string;
    textLinks: string;
    titleDisclaimer: string;
    textDisclaimer: string;
    titleCopyright: string;
    textCopyright: string;
  };
};
