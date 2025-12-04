import { GeneralTranslation } from "../../types/translations/General";

const common: GeneralTranslation["common"] = {
  currentLanguage: "English",
  open: "Open",
  close: "Close",
  back: "Back",
  proceed: "Continue",
  retry: "Retry",
  save: "Save",
  cancel: "Cancel",
  from: "From",
  You: "You",
  great: "Great",
  maxGamePoints: "You have scored {POINTS} out of a possible {MAX_POINTS} points in this game.",
};

const settings: GeneralTranslation["settings"] = {
  title: "Settings",
  audioEnabled: "Sound on",
  musicVolume: "Music",
  soundEffectsVolume: "Sound effects",
  chooseLanguage: "Choose language",
};

const about: GeneralTranslation["legal"] = {
  titleImpressum: "Imprint",
  titleGeneral: "General Information",
  textGeneral: "This application was developed as part of a student project for the Bachelor's program in Computer Science at the University of Applied Sciences and Arts Northwestern Switzerland (FHNW). The client and party responsible for the content is DataPro. DataPro is a project funded within the EU program Erasmus+ School Education from 2023-2026 and is thus co-financed by the EU (Web: www.datapro.education).",
  titleContact: "Contact",
  textContact: "The operator of this website is the Freiburg University of Education (Pädagogische Hochschule Freiburg). It can be reached at \n" +
    "Pädagogische Hochschule Freiburg \n" +
    "Kunzenweg 21\n" +
    "79117 Freiburg\n" +
    "Tel.: (0761) 682-0\n" +
    "Fax: (0761) 682-402\n" +
    "E-Mail: rektor(at)ph-freiburg.de\n" +
    "Internet: www.ph-freiburg.de\n" +
    "The Freiburg University of Education is a corporation under public law.\n" +
    "It is legally represented by the Rector.\n" +
    "The responsible admissions and supervisory authority is the Ministry of Science, Research and Arts Baden-Württemberg (MWK) (Königstraße 46, D - 70173 Stuttgart, Web: mwk.baden-wuerttemberg.de).\n",
  titleLinks: "External Links",
  textLinks: "This application contains links to external websites. The respective provider or operator is responsible for the content of the linked pages.",
  titleCopyright: "Copyright",
  textCopyright: "The source code of this website is available on GitHub: www.github.com/nothing-to-hide/nothing-to-hide. It is an open-source application, and the use of the code and content is governed by the MIT license.",
  titleDisclaimer: "Disclaimer",
  textDisclaimer: "The content of this application was created with the greatest care. However, no guarantee can be given for the correctness, completeness, and timeliness of the content. We recommend playing under parental or school supervision. As a student project, this application serves exclusively for demonstration and learning purposes. No liability is assumed for damages of a material or immaterial nature arising from the use or non-use of the information provided.",
  titlePrivacy: "Privacy Policy",
  textPrivacy: "The application was designed from the ground up so that it is not possible to identify natural persons. All data collected is anonymised and no personal data is processed. Furthermore, no data is transferred to external service providers or third parties. \n" +
    "You can address further inquiries at any time to the DataPro project at the Freiburg University of Education. Please include \"DataPro Web Games\" in the subject line of your email to poststelle(at)ph-freiburg.de.\n" +
    "Should you have further questions regarding your data protection, please contact our Data Protection Officer at datenschutz(at)ph-freiburg.de.\n" +
    "Furthermore, you have the option to lodge a complaint with the State Commissioner for Data Protection and Freedom of Information in Baden-Württemberg (Web: https://www.baden-wuerttemberg.datenschutz.de/).",
};

export const general: GeneralTranslation = {
  common,
  settings,
  legal: about,
};
