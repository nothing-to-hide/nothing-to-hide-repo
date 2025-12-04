import { GeneralTranslation } from "../../types/translations/General";

const common: GeneralTranslation["common"] = {
  currentLanguage: "Deutsch",
  open: "Öffnen",
  close: "Schliessen",
  back: "Zurück",
  proceed: "Weiter",
  retry: "Nochmal",
  save: "Speichern",
  cancel: "Abbrechen",
  from: "Von",
  You: "Du",
  great: "super",
  maxGamePoints: "Du hast {POINTS} von möglichen {MAX_POINTS} Punkten in diesem Spiel erreicht.",
};

const settings: GeneralTranslation["settings"] = {
  title: "Einstellungen",
  audioEnabled: "Ton an",
  musicVolume: "Musik",
  soundEffectsVolume: "Soundeffekte",
  chooseLanguage: "Sprache wählen",
};

const about: GeneralTranslation["legal"] = {
  titleImpressum: "Impressum",
  titleGeneral: "Allgemeine Information",
  textGeneral: "Diese Anwendung wurde im Rahmen eines Studierendenprojekt des Bachelorstudiengangs Informatik an der Fachhochschule Nordwestschweiz (FHNW) entwickelt. Der Auftraggeber und inhaltlich verantwortlich ist DataPro. DataPro ist ein innerhalb des EU-Programms Erasmus+ Schulbildung von 2023-2026 gefördertes Projekt und wird somit von der EU ko-finanziert (Web: www.datapro.education).",
  titleContact: "Kontakt",
  textContact: "Der Betreiber dieser Website ist die Pädagogische Hochschule Freiburg. Zu erreichen ist diese unter \n" +
    "Pädagogische Hochschule Freiburg \n" +
    "Kunzenweg 21\n" +
    "79117 Freiburg\n" +
    "Tel.: (0761) 682-0\n" +
    "Fax: (0761) 682-402\n" +
    "E-Mail: rektor(at)ph-freiburg.de\n" +
    "Internet: www.ph-freiburg.de\n" +
    "Die Pädagogische Hochschule Freiburg ist eine Körperschaft des Öffentlichen Rechts.\n" +
    "Sie wird durch den Rektor/ die Rektorin gesetzlich vertreten.\n" +
    "Die zuständige Zulassungs- und Aufsichtsbehörde ist das Ministerium für Wissenschaft, Forschung und Kunst Baden-Württemberg (MWK) (Königstraße 46, D - 70173 Stuttgart, Web: mwk.baden-wuerttemberg.de).\n",
  titleLinks: "Externe Links",
  textLinks: "Diese Anwendung enthält Verlinkungen zu externen Websites.  Verantwortlich für die Inhalte der verlinkten Seiten ist der jeweilige Anbieter oder Betreiber.",
  titleCopyright: "Urheberrecht",
  textCopyright: "Der Quellcode dieser Webseite ist auf GitHub verfügbar: www.github.com/nothing-to-hide/nothing-to-hide. Es handelt sich um eine sogenannte Open-Source-Anwendung, die Nutzung des Codes und der Inhalte unterliegt der MIT Lizenz.",
  titleDisclaimer: "Haftungsausschluss",
  textDisclaimer: "Die Inhalte dieser Anwendung wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Wir empfehlen das Spielen unter elterlicher oder schulischer Aufsicht. Als Studierendenprojekt dient diese Anwendung ausschließlich Demonstrations- und Lernzwecken. Es wird keine Haftung für Schäden materieller oder immaterieller Art, die aus der Nutzung oder Nichtnutzung der bereitgestellten Informationen entstehen, übernommen.",
  titlePrivacy: "Datenschutz",
  textPrivacy: "Die Anwendung wurde von Grund auf so konzipiert, dass keine Identifizierung der natürlichen Person möglich ist. Alle erfassten Daten sind anonymisiert und es werden keine personenbezogenen Daten verarbeitet. Des Weiteren werden keine Daten an externe Dienstleister oder Dritte übertragen. \n" +
    "Weitere Anfragen können Sie jederzeit an das DataPro-Projekt an der Pädagogischen Hochschule Freiburg richten. Bitte nennen Sie dafür „DataPro Web-Spiele“ im Betreff der E-Mail an poststelle(at)ph-freiburg.de.\n" +
    "Sollten Sie weitere Fragen zu Ihrem Datenschutz haben, wenden Sie sich bitte an unseren Datenschutzbeauftragen unter datenschutz(at)ph-freiburg.de.\n" +
    "Weiterhin haben Sie die Möglichkeit, Fragen oder Beschwerden beim Landesbeauftragten für Datenschutz und Informationssicherheit in Baden-Württemberg einzureichen ( Web: https://www.baden-wuerttemberg.datenschutz.de/).\n",

};

export const general: GeneralTranslation = {
  common,
  settings,
  legal: about,
};
