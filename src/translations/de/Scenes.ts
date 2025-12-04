import {
  SocialMediaTranslation,
  CookieTranslation,
  PhishingTranslation,
  PhotosTranslation,
  PasswordTranslation,
} from "../../types/translations/Scenes";

const socialMedia: SocialMediaTranslation = {
  prologue: {
    bedroom:
      "<T>Dein Schlafzimmer, sanftes Licht. Dein Handy vibriert – eine neue Nachricht im Gruppenchat. Du bist gespannt, was passiert.</T>",
    innerDialog:
      "<T>Max, mein bester Freund, schreibt wieder was Lustiges... Mal sehen, was diesmal los ist.</T>",
  },
  intro: {
    chatGroupName: "Schulgruppe",
    chat1: {
      characterName: "Max",
      dialog:
        "Hey Leute! Die neue Social-Media-Plattform InstaVibe ist mega! Kommt auch drauf, dann sind wir alle zusammen!🔥🔥🔥",
    },
    chat2: {
      characterName: "Lea",
      dialog:
        "Schon wieder was Neues? Ich komm nicht mal mit HoloSnap klar 😂 Max, du bist echt immer der Erste bei sowas!",
    },
    chat3: {
      characterName: "Timo",
      dialog: "Wenn Max drauf ist, wird's eh wieder gehypt 😅 Hast du nen Link?",
    },
    chat4: {
      characterName: "Max",
      dialog:
        "Schon geladen! InstaVibe ist wie Insta, aber mit Vibes… vertraut mir 😎 Hier der Link für euch!",
    },
    player1: {
      dialog:
        "<B>Du tippst nachdenklich...</B>\nHmm… InstaVibe, klingt spannend. Ob das wirklich so cool ist, wie Max sagt? Ich schau mal kurz rein, bevor ich schlafen gehe.",
    },
    player2: {
      dialog:
        "<B>Du hast InstaVibe installiert</B>\nOkay, InstaVibe... Zeig mir, was du kannst! Mal sehen, ob Max recht hat.",
    },
  },
  miniGame: {
    youHave: "Du hast",
    objectsFound: "Objekte gefunden!",
    all: "alle",
    title: "Minigame: Wimmelbild",
    description:
      "Du bist gerade dabei, dein erstes InstaVibe-Profilbild hochzuladen. Doch bevor du es postest, fällt dir auf: Im Hintergrund sind ein paar Dinge, die besser nicht jeder sehen sollte! Hilf mit, alle peinlichen oder privaten Objekte im Bild zu finden und zu entfernen, bevor das Bild online geht. So schützt du deine Privatsphäre – wie würdest du dich fühlen, wenn plötzlich alle alles sehen könnten?",
    miniGameGiveUp: "Aufgeben",
    tutorial: [
      {
        title: "Objekte finden",
        message:
          "Klicke bzw. Tippe auf das Objekt, das du gefunden hast. Wenn es korrekt ist, verschwindet es und du hörst einen Sound.",
      },
      {
        title: "Punktestand",
        message:
          "Schau dir dein Bild genau an: Welche Dinge würdest du lieber nicht mit der ganzen Welt teilen? Tippe auf alles, was privat bleiben sollte. Wenn du richtig liegst, verschwindet das Objekt und du hörst einen Sound.",
      },
      {
        title: "Zeitlimit",
        message:
          'Achte auf die Zeit! Wenn du nicht alle Objekte findest, bevor die Uhr abläuft, wird das Bild trotzdem gepostet – und alle können es sehen. Du kannst auch auf "Aufgeben" drücken, wenn du nicht weiterkommst.',
      },
    ],
  },
  quiz: [
    {
      question:
        "Nachdem du InstaVibe installiert hast - was bedeutet es eigentlich, wenn dein Profil „öffentlich“ ist?",
      answers: [
        {
          text: "Nur du kannst deine Beiträge sehen",
          description:
            "Wenn dein Profil öffentlich ist, kannst nicht nur du, sondern jeder deine Beiträge anschauen — auch Fremde.",
        },
        {
          text: "Jeder im Internet kann deine Beiträge sehen",
          description:
            "Ein öffentliches Profil bedeutet, dass jeder, sogar Leute, die du nicht kennst, alles sehen können, was du postest — Fotos, Videos, Texte.",
          isCorrect: true,
        },
        {
          text: "Nur deine Freunde können deine Beiträge sehen",
          description:
            "Wenn du deine Beiträge nur für Freunde sichtbar machen willst, musst du dein Profil auf privat einstellen.",
        },
        {
          text: "Nur deine Familie kann deine Beiträge sehen",
          description:
            "Bei einem öffentlichen Profil kann nicht nur deine Familie, sondern wirklich jeder Internetnutzer deine Inhalte sehen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du willst auf InstaVibe eine coole Bio schreiben - warum solltest du dabei keine persönlichen Daten angeben?",
      answers: [
        {
          text: "Es ist langweilig für andere",
          description:
            "Ob etwas spannend ist oder nicht, spielt keine Rolle — es geht hier um Sicherheit, nicht um Unterhaltung.",
        },
        {
          text: "Fremde könnten diese Informationen missbrauchen",
          description:
            "Wenn du z. B. dein Alter, deine Schule oder deinen Wohnort in der Bio schreibst, können " +
            "Fremde diese Infos nutzen, um dir zu schaden – z. B. dich zu manipulieren oder dir gezielt gefährliche Nachrichten zu schicken.",
          isCorrect: true,
        },
        {
          text: "Niemand liest die Bio",
          description:
            "Viele Leute schauen sich die Bio an, vor allem wenn du neue Follower bekommst. Gerade Fremde lesen sie oft zuerst.",
        },
        {
          text: "Weil sich meine persönlichen Daten jedes Jahr ändern",
          description:
            "Ob sich etwas ändert oder nicht, ist nicht der Grund. Das Problem ist, dass persönliche Daten Fremden zu viel über dich verraten und dadurch Risiken entstehen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Nach dem ersten InstaVibe-Post: Wie schützt du deine Fotos vor fremden Blicken?",
      answers: [
        {
          text: "Standort ausschalten",
          description:
            "Standort ausschalten ist zwar sinnvoll, schützt aber nicht deine Fotos direkt vor fremden Blicken.",
        },
        {
          text: "Privatsphäre-Einstellungen anpassen",
          description:
            'Wenn du deine Privatsphäre richtig einstellst (z. B. Profil auf "privat" setzen oder auswählen, ' +
            "wer deine Beiträge sehen darf), können nur ausgewählte Leute deine Fotos sehen.",
          isCorrect: true,
        },
        {
          text: "Viele Freunde hinzufügen",
          description:
            "Je mehr Menschen du hinzufügst, desto grösser ist das Risiko, dass jemand deine Bilder missbraucht oder weiterverbreitet.",
        },
        {
          text: "Jeden Post liken",
          description: "Liken schützt deine eigenen Fotos überhaupt nicht.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Max hat dich auf ein komisches Profil aufmerksam gemacht - woran erkennst du, ob es ein Fake ist?",
      answers: [
        {
          text: "An einem verifizierten Haken",
          description:
            "Ein verifizierter Haken bedeutet meist, dass das Profil echt ist – Fake-Profile haben so etwas fast nie.",
        },
        {
          text: "An vielen Fotos und echten Freunden",
          description:
            "Viele echte Freunde und Beiträge sind eher ein Zeichen für ein echtes Profil.",
        },
        {
          text: "An wenigen Infos, unbekannten Bildern und kaum Beiträgen",
          description:
            "Fake-Profile wirken oft leer, benutzen Stockfotos oder fremde Bilder und haben keine echten Inhalte.",
          isCorrect: true,
        },
        {
          text: "Am lustigen Namen",
          description: "Ein lustiger Name allein sagt nichts über Echtheit oder Fälschung aus.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Beim Scrollen auf InstaVibe - wie sorgst du dafür, dass deine Privatsphäre wirklich geschützt bleibt?",
      answers: [
        {
          text: "Alles öffentlich posten",
          description:
            "Wenn alles öffentlich ist, können auch Fremde alles sehen – das ist unsicher.",
        },
        {
          text: "Deine Beiträge nur für Freunde sichtbar machen",
          description:
            "Wenn du deine Beiträge nur für Freunde sichtbar machst, schützt du deine Daten und gibst sie nicht Unbekannten preis.",
          isCorrect: true,
        },
        {
          text: "Jeden Beitrag liken",
          description: "Liken hat nichts mit dem Schutz deiner eigenen Daten zu tun.",
        },
        {
          text: "Fremden deine Adresse schicken",
          description:
            "Niemals persönliche Daten wie deine Adresse an Fremde weitergeben – das ist sehr gefährlich.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du denkst darüber nach, die Nachricht von Max zu posten - warum ist das ohne Erlaubnis keine gute Idee?",
      answers: [
        {
          text: "Weil es niemanden interessiert",
          description:
            "Es geht nicht darum, ob es jemanden interessiert, sondern um Privatsphäre und Respekt.",
        },
        {
          text: "Weil es das Handy langsamer macht",
          description:
            "Ein Screenshot macht dein Handy nicht langsamer, das ist nicht das Problem.",
        },
        {
          text: "Weil es unfair und oft verboten ist",
          description:
            "Private Nachrichten sind vertraulich — sie ohne Zustimmung zu veröffentlichen ist unfair und kann sogar rechtliche Folgen haben.",
          isCorrect: true,
        },
        {
          text: "Weil es weniger Likes bringt",
          description: "Likes haben nichts mit dem Recht auf Privatsphäre zu tun.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Was ist im Umgang mit Fotos von anderen auf InstaVibe wirklich erlaubt?",
      answers: [
        {
          text: "Du darfst ohne Probleme Fotos von allen Personen posten",
          description:
            "Jeder Mensch hat ein Recht am eigenen Bild – du darfst Fotos nicht einfach so posten.",
        },
        {
          text: "Du brauchst die Erlaubnis der Personen auf dem Bild, um es posten zu dürfen",
          description:
            "Bevor du ein Bild veröffentlichst, musst du die Zustimmung aller Personen darauf einholen – das ist fair und oft sogar gesetzlich vorgeschrieben.",
          isCorrect: true,
        },
        {
          text: "Bilder von Freunden darfst du immer posten",
          description:
            "Auch Freunde haben Privatsphäre-Rechte und dürfen entscheiden, ob ein Bild online gestellt wird.",
        },
        {
          text: "Solange du niemanden markierst, ist alles erlaubt",
          description:
            "Ob jemand markiert ist oder nicht, ändert nichts daran, dass du erst um Erlaubnis fragen musst.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du bekommst eine seltsame Nachricht von einem Fremden - wie solltest du darauf reagieren?",
      answers: [
        {
          text: "Ignorieren und nichts tun",
          description:
            "Ignorieren hilft oft nicht, die Nachricht bleibt da und kann schlimmer werden.",
        },
        {
          text: "Teilen und weiterleiten",
          description: "Weiterleiten verbreitet nur noch mehr Hass oder Gefahr.",
        },
        {
          text: "Blockieren und melden",
          description:
            "Am besten blockierst du die Person sofort und meldest die Nachricht beim Netzwerk — so wird gegen solche Nutzer etwas unternommen.",
          isCorrect: true,
        },
        {
          text: "Zurück beleidigen",
          description:
            "Beleidigungen zurückzuschicken macht alles schlimmer und kann auch dich in Schwierigkeiten bringen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Eine fremde Person sendet dir auf InstaVibe eine Freundschaftsanfrage - warum solltest du vorsichtig sein?",
      answers: [
        {
          text: "Weil es sonst zu viele Freunde werden",
          description: "Es geht nicht darum, wie viele Freunde du hast, sondern um Sicherheit.",
        },
        {
          text: "Weil Fremde deine Infos ausspionieren könnten",
          description:
            "Wenn du Fremden Zugang zu deinem Profil gibst, können sie deine persönlichen Daten sehen und sie vielleicht sogar missbrauchen.",
          isCorrect: true,
        },
        {
          text: "Weil dein Akku sonst leer wird",
          description:
            "Deine Freunde haben keinen Einfluss auf den Akku deines Handys. Es geht hier um Sicherheit, nicht um den Akku.",
        },
        {
          text: "Weil es peinlich ist",
          description:
            "Es ist nicht peinlich, Freundschaftsanfragen zu ignorieren, die du nicht willst. Es geht um Privatsphäre und Schutz.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Du überlegst, deinen Standort im Profil zu teilen - was kann dadurch passieren?",
      answers: [
        {
          text: "Dein Akku lädt schneller",
          description: "Der Standort hat keinen Einfluss auf die Ladegeschwindigkeit deines Akkus.",
        },
        {
          text: "Fremde könnten dich finden oder dir folgen",
          description:
            "Wenn du deinen echten Standort teilst, können Fremde herausfinden, wo du bist, und dich vielleicht verfolgen oder auf unangenehme Weise kontaktieren.",
          isCorrect: true,
        },
        {
          text: "Du bekommst ein Geschenk",
          description:
            "Das Teilen deines Standorts bringt keine Geschenke — es kann dich in Gefahr bringen.",
        },
        {
          text: "Dein Profil wird gelöscht",
          description:
            "Dein Profil wird nicht gelöscht, aber das Teilen deines Standorts kann deine Sicherheit gefährden.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Nachdem du dein InstaVibe-Profil eingerichtet hast - warum solltest du deine Handynummer dort nicht posten?",
      answers: [
        {
          text: "Weil es keinen interessiert",
          description:
            "Es geht nicht darum, ob es jemanden interessiert oder nicht. Privatsphäre und Sicherheit sind entscheidend.",
        },
        {
          text: "Weil Fremde dich belästigen oder betrügen könnten",
          description:
            "Wenn du deine Handynummer öffentlich zeigst, könnten Fremde dich anrufen, belästigen oder sogar betrügen.",
          isCorrect: true,
        },
        {
          text: "Weil du dann weniger Likes bekommst",
          description: "Die Anzahl der Likes hat nichts mit deiner Handynummer zu tun.",
        },
        {
          text: "Weil sie automatisch gelöscht wird",
          description:
            "Deine Handynummer wird nicht automatisch gelöscht, aber sie kann von anderen missbraucht werden.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du willst dein Profil aufpeppen - welche Info solltest du lieber NICHT veröffentlichen?",
      answers: [
        {
          text: "Dein Lieblingsessen",
          description:
            "Dein Lieblingsessen ist keine vertrauliche Information und stellt keine Gefahr dar.",
        },
        {
          text: "Deine Adresse",
          description:
            "Deine Adresse solltest du niemals auf Social Media teilen, weil Fremde sie sehen und deine Sicherheit gefährden könnten.",
          isCorrect: true,
        },
        {
          text: "Ein Foto von deinem Hund",
          description:
            "Ein Foto von deinem Hund ist völlig unproblematisch, solange es keine privaten Informationen preisgibt.",
        },
        {
          text: "Ein Sonnenuntergang",
          description:
            "Ein Foto von einem Sonnenuntergang ist unbedenklich und hat keinen Einfluss auf deine Privatsphäre.",
        },
      ],
      timeLimit: 30,
    },
  ],
};

const cookie: CookieTranslation = {
  intro: {
    buttonTextAcceptCookies: "Alle Cookies akzeptieren",
    buttonTextManageCookies: "Cookies bearbeiten",
    cookieInfo1:
      "Wir und ausgewählte Dritte verwenden Cookies oder ähnliche Technologien, wie in der Cookie-Richtlinie angegeben.\nSie können der Nutzung solcher Technologien zustimmen, indem Sie auf die Schaltfläche Akzeptieren klicken.",
    player1: {
      dialog:
        "Hmm.., wieso sollte ich diese Cookies annehmen? Lass mich mal lieber die Cookies verwalten und sehen, was da nicht nötig ist.",
    },
    hint: {
      dialog: "Ich kann noch nicht weiter. Etwas muss aktiviert werden, was die Webseite braucht.",
    },
    cookies: {
      title: "Möchtest du ein Cookie?",
      essentialTitle: "Essenziell:",
      nonEssentialTitle: "Nicht essenziell:",
      essential: {
        login: "Login",
        security: "Sicherheit",
        language: "Sprache",
        system: "System",
      },
      nonEssential: {
        tracking: "Tracking",
        advertising: "Werbung",
        marketing: "Marketing",
        thirdParty: "Drittanbieter",
        social: "Soziale Medien",
        remarketing: "Remarketing",
        analytics: "Analytics",
      },
      cookieInfo2:
        "Hier kannst du deine Cookies verwalten. Einige sind erforderlich und können nicht deaktiviert werden.",
      cookieInfo3:
        "Ich kann noch nicht weiter. Es müssen noch ein oder mehrere Cookies deaktiviert werden.",
      buttonTextContinue: "Weiter",
    },
  },
  miniGame: {
    title: "Cookie Cutter",
    description: "Zerstöre alle bösen Cookies innerhalb der vorgegebenen Zeit.",
    goodCookieTexts: ["Session", "Warenkorb", "Sicherheit", "Sprache", "System"],
    badCookieTexts: [
      "Tracking",
      "Werbung",
      "Marketing",
      "Drittanbieter",
      "Social Media",
      "Remarketing",
      "Analytics",
    ],
    tutorial: [
      {
        title: "Cookie Cutter",
        message: "Swipe über den Bildschirm, um die schlechten Cookies zu zerstören.",
      },
      {
        title: "Die Zeit läuft!",
        message: "Behalte den Timer in den Augen.",
      },
      {
        title: "Punktestand",
        message:
          "Wie viele richtige Kekse du zerstört hast, siehst du an deinem Punktestand. Wenn du ein wichtiges Cookie zerstörst, gibt es Minuspunkte.",
      },
    ],
  },
  quiz: [
    {
      question: "Wofür werden Cookies im Internet verwendet?",
      answers: [
        {
          text: "Damit Webseiten sich Dinge merken können (z. B. Login, Warenkorb)",
          description:
            "Cookies speichern Informationen, damit Webseiten dich wiedererkennen – etwa deinen Login-Status oder was im Warenkorb liegt.",
          isCorrect: true,
        },
        {
          text: "Damit dein Computer schneller läuft",
          description: "Cookies beeinflussen nicht die Hardware-Leistung deines Computers.",
        },
        {
          text: "Damit du mehr Punkte in Videospielen bekommst",
          description: "Cookies haben keinen Einfluss auf deine Punkte in Spielen.",
        },
        {
          text: "Damit du automatisch Updates bekommst",
          description: "Updates werden nicht durch Cookies gesteuert.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Was sind Tracking-Cookies?",
      answers: [
        {
          text: "Cookies, die deinen Standort verfolgen",
          description:
            "Tracking-Cookies verfolgen nicht deinen exakten Standort, sondern dein Surfverhalten.",
        },
        {
          text: "Cookies, die dich verfolgen, welche Webseiten du besuchst, um Werbung anzupassen",
          description:
            "Tracking-Cookies protokollieren dein Surfverhalten, damit Werbung auf dich zugeschnitten werden kann.",
          isCorrect: true,
        },
        {
          text: "Cookies, die dein Passwort speichern",
          description: "Passwörter werden nicht in Tracking-Cookies gespeichert.",
        },
        {
          text: "Cookies, die Viren verhindern",
          description: "Cookies schützen nicht vor Viren.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Warum fragt dich „InstaVibe“ beim ersten Start, ob du Cookies akzeptieren möchtest?",
      answers: [
        {
          text: "Damit du mehr Likes bekommst",
          description: "Likes haben nichts mit Cookie-Einwilligungen zu tun.",
        },
        {
          text: "Weil die App sonst nicht weiss, ob du Instagram magst",
          description: "Cookie-Abfragen haben nichts mit deinem Geschmack zu tun.",
        },
        {
          text: "Weil es in vielen Ländern Gesetze gibt, die dich vor Cookies schützen sollen",
          description:
            "Gesetze wie die DSGVO verlangen eine Einwilligung, damit du Kontrolle über deine Daten hast.",
          isCorrect: true,
        },
        {
          text: "Damit dein Handy nicht abstürzt",
          description: "Die Stabilität deines Handys hängt nicht von Cookies ab.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Was wäre ohne Cookies bei „InstaVibe“ schwieriger?",
      answers: [
        {
          text: "Eingeloggt bleiben und direkt dein Profil öffnen",
          description:
            "Ohne Cookies müsstest du dich öfter neu anmelden, da der Login-Status nicht gespeichert wird.",
          isCorrect: true,
        },
        {
          text: "Fotos mit Filtern bearbeiten",
          description: "Filter hängen nicht von Cookies ab.",
        },
        {
          text: "Videos hochladen",
          description: "Uploads funktionieren unabhängig von Cookies.",
        },
        {
          text: "Nachrichten verschicken",
          description: "Nachrichtenversand benötigt in der Regel keine Cookies.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Welche Cookies sind hilfreich?",
      answers: [
        {
          text: "Login, Tracking, Analytics, System",
          description: "Nicht alle hier sind gleich hilfreich oder notwendig.",
        },
        {
          text: "System, Login, Advertising",
          description: "Advertising ist nicht notwendig, um Funktionen bereitzustellen.",
        },
        {
          text: "Sprache, System, Sicherheit, Login",
          description:
            "Diese Cookie-Kategorien helfen bei Spracheinstellungen, Sicherheit und Anmeldung und sind nützlich.",
          isCorrect: true,
        },
        {
          text: "Keine Antwort ist richtig",
          description: "Es gibt eine richtige Antwort.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Wofür braucht „InstaVibe“ System-Cookies?",
      answers: [
        {
          text: "Damit du mehr Likes bekommst",
          description: "Likes haben nichts mit System-Cookies zu tun.",
        },
        {
          text: "Damit du Werbung für Schuhe bekommst",
          description: "Das wäre Aufgabe von Marketing-Cookies, nicht System-Cookies.",
        },
        {
          text: "Damit dein Handy schneller läuft",
          description: "System-Cookies beeinflussen nicht die Gerätegeschwindigkeit.",
        },
        {
          text: "Damit die App weiss, dass du eingeloggt bist und deine Bilder laden kann",
          description:
            "System- bzw. notwendige Cookies sind für Grundfunktionen wie Login-Status und das Laden von Inhalten wichtig.",
          isCorrect: true,
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Was passiert, wenn man die System-Cookies von „InstaVibe“ abschaltet?",
      answers: [
        {
          text: "Die App funktioniert nicht mehr richtig",
          description:
            "Ohne notwendige Cookies können grundlegende Funktionen wie Login oder das Laden von Seiten gestört sein.",
          isCorrect: true,
        },
        {
          text: "Man sieht weniger personalisierte Werbung",
          description: "Das betrifft eher Marketing-Cookies, nicht System-Cookies.",
        },
        {
          text: "Man bekommt mehr Likes",
          description: "Cookies haben keinen Einfluss auf Likes.",
        },
        {
          text: "Man kann weiter posten, aber ohne Filter",
          description: "Filter hängen nicht von System-Cookies ab.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Warum sind Analytics-Cookies für „InstaVibe“ wichtig?",
      answers: [
        {
          text: "Damit deine Freunde deine Fotos schneller liken",
          description: "Likes werden dadurch nicht beeinflusst.",
        },
        {
          text: "Damit die App weiss, welche Funktionen beliebt sind, und sie verbessern kann",
          description:
            "Analytics-Cookies helfen zu verstehen, welche Bereiche genutzt werden, um die App zu verbessern.",
          isCorrect: true,
        },
        {
          text: "Damit dein Handy mehr Speicher hat",
          description: "Cookies erhöhen keinen Gerätespeicher.",
        },
        {
          text: "Damit du automatisch Follower bekommst",
          description: "Analytics führen nicht automatisch zu mehr Followern.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Was machen Marketing-Cookies bei „InstaVibe“?",
      answers: [
        {
          text: "Sie machen deine Videos beliebter",
          description: "Die Beliebtheit hängt nicht von Cookies ab.",
        },
        {
          text: "Sie speichern, welche Filter du benutzt",
          description: "Das wären eher  Analytics-Cookies.",
        },
        {
          text: "Sie sorgen dafür, dass dein Profil privat bleibt",
          description: "Privatsphäre-Einstellungen sind unabhängig von Cookies.",
        },
        {
          text: "Sie zeigen dir Werbung passend zu dem, was du dir anschaust (z. B. Sportklamotten, wenn du viele Sportseiten besuchst)",
          description:
            "Marketing-Cookies personalisieren Werbung basierend auf deinem Surfverhalten.",
          isCorrect: true,
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Welche Art von Cookies nutzt „InstaVibe“, um zu prüfen, welche Funktionen am meisten benutzt werden (z. B. Stories, Reels, Nachrichten)?",
      answers: [
        {
          text: "Schokoladen-Cookies",
          description: "Lecker, aber nicht gemeint",
        },
        {
          text: "Marketing-Cookies",
          description: "Marketing-Cookies werden vor allem für personalisierte Werbung verwendet.",
        },
        {
          text: "Analytics-Cookies",
          description:
            "Analytics-Cookies messen Nutzung und helfen zu verstehen, welche Funktionen beliebt sind.",
          isCorrect: true,
        },
        {
          text: "System-Cookies",
          description: "System-Cookies sind für Grundfunktionen zuständig, nicht für Auswertungen.",
        },
      ],
      timeLimit: 30,
    },
  ],
};

const phishing: PhishingTranslation = {
  prologue: {
    bedroom:
      "<T>[Du packst gerade deinen Rucksack für die Schule, als dein Handy erneut vibriert. InstaVibe meldet sich – du bist neugierig, was dich erwartet.]</T>",
  },
  intro: {
    player1: {
      dialog: "Wer schreibt mir denn jetzt auf InstaVibe? Hoffentlich nichts Komisches...",
    },
    chat1: {
      characterName: "Jonas M. (10B)",
      dialog:
        "Hey! Du bist doch in der 10A, oder? Ich plane ein Event für die Schule und brauche dafür die Klassenliste – Telefonnummern und Adressen. Kannst du mir die schnell schicken? Danke dir!",
    },
    player2: {
      dialog:
        "Jonas? Ich bin mir nicht sicher, ob ich ihn wirklich kenne... Sollte ich ihm vertrauen?",
    },
  },
  miniGame: {
    title: "Rette den Fisch - erkenne Phishing!",
    description: `Im Internet ist nicht alles echt - das gilt auch unter Wasser!
                  Köder mit Nachrichten fallen ins Meer. Steuere den Taucher per Klick zu den Angelhaken, lies die 
                  Nachrichten und entscheide: Ist das Phishing oder nicht?`,
    hint: "Jede falsche Entscheidung bringt deinen Fisch in Gefahr - also pass gut auf!",
    startButton: "Auf geht's!",
    legit: "Echt",
    phishing: "Phishing",
    gameOver: "Spiel vorbei",
    success:
      "Gut gemacht! Du hast dem Fisch geholfen, gefährliche Köder zu meiden und sicher zu bleiben. Genauso schützt du dich auch im echten Leben vor Phishing, wenn du aufmerksam bleibst.",
    failure:
      "Oh nein! Der Fisch hat zu viele gefährliche Nachrichten geschluckt und es nicht geschafft. Auch im Internet kann ein falscher Klick grossen Schaden anrichten.",
    phishingMessages: [
      {
        type: "email",
        sender: "support@instavibe.com",
        text: "Dein Konto wurde wegen verdächtiger Aktivitäten gesperrt. Bitte logge dich hier ein, um es zu entsperren.",
        isPhishing: true,
      },
      {
        type: "email",
        sender: "gewinn@streamfest.io",
        text: "Herzlichen Glückwunsch! Du hast 3 Monate Gratis-Streaming gewonnen. Jetzt einlösen.",
        isPhishing: true,
      },
      {
        type: "email",
        sender: "update@gameworld.io",
        text: "Ein neues Update ist erforderlich. Lade es hier herunter, um weiterzuspielen.",
        isPhishing: true,
      },
      {
        type: "email",
        sender: "verifizierung@instavibe-support.com",
        text: "Bestätige dein InstaVibe-Konto jetzt, sonst wird es deaktiviert.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+49 1521 4455667",
        text: "Hey, ich bin's von der Schule. Kannst du mir dein InstaVibe-Login schicken? Ich muss was prüfen.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+43 660 9876543",
        text: "Dein Paket konnte nicht zugestellt werden. Bestätige deine Adresse hier.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+41 76 123 4567",
        text: "Du hast bei einem Gewinnspiel gewonnen! Jetzt Preis sichern.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+31 612345678",
        text: "Ein fremder Zugriff wurde auf dein Konto entdeckt. Konto jetzt sichern.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+33 612 345 678",
        text: "Rechnung nicht bezahlt. Zahlung über diesen Link durchführen.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@instavibe_gewinnspiel",
        text: "Du bist einer unserer Top-Fans! Gewinne jetzt exklusives InstaVibe-Merch. Nur kurz Formular ausfüllen.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@lehrergruppe_official",
        text: "Kannst du mir die Testantworten nochmal schicken? Ich hab sie verloren. Hier ist der Link.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@free_gamecoins",
        text: "Gratis-Coins für dein Lieblingsspiel – exklusiv für InstaVibe-User!",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@instavibe_support_admin",
        text: "Bitte gib deine Zugangsdaten ein, um den Zugang nicht zu verlieren.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@event_offiziell",
        text: "Freikarten für das Konzert! Nur für die ersten 100 – schnell sein!",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@instavibe_warnung",
        text: "Dein Account wurde gemeldet. Beschwerde hier einsehen.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@marken_support_fake",
        text: "Zur Bestätigung deines letzten Beitrags: Bitte hier dein Passwort eingeben.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@randomuser324",
        text: "Hey, jemand benutzt deine Bilder auf InstaVibe. Schau mal hier!",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@instavibe.alert",
        text: "Aufgrund hoher Auslastung musst du dich neu anmelden. Hier klicken.",
        isPhishing: true,
      },
      {
        type: "email",
        sender: "support@instavibe.com",
        text: "Deine Anmeldung war erfolgreich. Willkommen bei InstaVibe!",
        isPhishing: false,
      },
      {
        type: "email",
        sender: "info@instavibe.com",
        text: "Wir haben dir eine Bestätigungs-E-Mail gesendet. Bitte bestätige deine Anmeldung.",
        isPhishing: false,
      },
      {
        type: "sms",
        sender: "+49 1521 4455667",
        text: "Dein Passwort wurde erfolgreich geändert. Du kannst dich jetzt einloggen.",
        isPhishing: false,
      },
      {
        type: "sms",
        sender: "+43 660 9876543",
        text: "Wir haben einen neuen Newsletter verschickt. Schau mal rein!",
        isPhishing: false,
      },
      {
        type: "chat",
        sender: "@instavibe_support",
        text: "Wie können wir dir helfen? Bei Fragen wende dich gerne an uns.",
        isPhishing: false,
      },
      {
        type: "chat",
        sender: "@instavibe_team",
        text: "Aktuelle Updates zu InstaVibe. Sieh dir die neuesten Funktionen an!",
        isPhishing: false,
      },
    ],
    tutorial: [
      {
        title: "Schwimmen",
        message:
          "Zeigen und halten Sie auf eine Stelle, um dorthin zu schwimmen (alternativ können Sie die Pfeiltasten verwenden).",
      },
      {
        title: "Phishing-Briefumschläge",
        message: "Schwimme in die Nähe eines Umschlags, um ihn zu öffnen",
      },
      {
        title: "Nachricht lesen",
        message: "Entscheide, ob es ein Köder ist oder nicht",
      },
      {
        title: "Schlechte Wahl",
        message: "Falsche Entscheidungen werden dem Fisch schaden",
      },
      {
        title: "Gute Wahl",
        message: "Richtige Entscheidungen werden den Fisch heilen",
      },
      {
        title: "Gesundheit des Fisches",
        message: "Das Ziel ist es, den Fisch am Leben zu erhalten",
      },
    ],
  },
  quiz: [
    {
      question:
        "Während du deine Mails checkst, erscheint eine verdächtige Nachricht – was versteht man unter Phishing?",
      answers: [
        {
          text: "Ein Online-Spiel",
          description: "Phishing ist kein Spiel, sondern eine Betrugsmethode",
        },
        {
          text: "Der Versuch, an persönliche Daten zu kommen",
          description:
            "Beim Phishing versuchen Betrüger, über gefälschte E-Mails, Webseiten oder " +
            "Nachrichten an vertrauliche Daten wie Passwörter, Kontodaten oder Zugangsdaten zu gelangen.",
          isCorrect: true,
        },
        {
          text: "Ein Musikstil",
          description: "Phishing hat nichts mit Musik zu tun",
        },
        {
          text: "Ein Antivirenprogramm",
          description:
            " Ein Antivirenprogramm schützt vor Viren, erkennt aber manchmal auch " +
            "Phishing-Versuche. Phishing selbst ist jedoch eine Betrugsmethode.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Max war sich bei einer Mail unsicher - woran hätte er erkennen können, dass es sich um Phishing handelt?",
      answers: [
        {
          text: "An einer offiziellen E-Mail-Adresse",
          description: "Kein Zeichen für Phishing, offizielle Adressen wirken seriös.",
        },
        {
          text: "An einer ungewöhnlichen oder fehlerhaften Absender-Adresse",
          description: "Ungewöhnliche oder fehlerhafte Absender sind ein klares Warnsignal",
          isCorrect: true,
        },
        {
          text: "An bunten Smileys im Betreff",
          description: "Smileys allein machen eine Mail nicht zu Phishing",
        },
        {
          text: "An einer freundlichen Begrüssung",
          description: "Freundliche Begrüssungen gibt es auch in echten Mails",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Die Nachricht wirkt dringlich - was schreiben Phishing-Betrüger oft, um dich zur Reaktion zu zwingen?",
      answers: [
        {
          text: "Ein Lob für dein sicheres Verhalten",
          description: "Lob wird selten verwendet, um Druck zu machen.",
        },
        {
          text: "Eine Drohung, dein Konto zu sperren",
          description: "Drohungen wie Kontosperrung setzen unter Stress und verleiten zum Klicken.",
          isCorrect: true,
        },
        {
          text: "Ein Gutschein-Code",
          description: "Gutscheine sollen locken, aber üben meist keinen akuten Druck aus.",
        },
        {
          text: "Ein lustiges Katzenbild",
          description: "Lustige Bilder sind harmlos und kein typisches Phishing-Mittel.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Welche dieser Merkmale deuten NICHT auf eine Phishing-Mail hin?",
      answers: [
        {
          text: "Unerwartete E-Mail mit Links",
          description: "Unerwartete Mails mit Links sind typisch für Phishing.",
        },
        {
          text: "Anfrage nach deinem Passwort",
          description: "Nach Passwörtern wird in Phishing-Mails oft gefragt.",
        },
        {
          text: "Rechtschreibfehler und seltsame Formulierungen",
          description: "Schlechte Sprache und Fehler sind ein häufiges Merkmal.",
        },
        {
          text: "Nachricht von deiner besten Freundin",
          description: "Nachrichten von echten Freunden sind kein typisches Phishing Anzeichen.",
          isCorrect: true,
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Die Fake-Mail verlangt nach Infos – auf welche Daten haben es die Betrüger meist abgesehen?",
      answers: [
        {
          text: "Deinen Lieblingssong",
          description: "Unwichtige Vorlieben interessieren Betrüger nicht.",
        },
        {
          text: "Deine Bankdaten und Passwörter",
          description: "Bankdaten und Passwörter sind das Hauptziel von Phishing.",
          isCorrect: true,
        },
        {
          text: "Dein Lieblingsessen",
          description: "Lieblingsessen hat für Betrüger keinen Wert.",
        },
        {
          text: "Deine Sportnoten",
          description: "Sportnoten sind für Betrüger uninteressant.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Du erhältst eine Mail, die dir komisch vorkommt – wie reagierst du am besten?",
      answers: [
        {
          text: "Link anklicken und prüfen",
          description: "Link anklicken kann gefährlich sein.",
        },
        {
          text: "Die Nachricht löschen oder melden",
          description: "Am besten löschen oder direkt melden.",
          isCorrect: true,
        },
        {
          text: "Schnell antworten",
          description: "Antworten gibt Betrügern eine Rückmeldung.",
        },
        {
          text: "Die Nachricht ignorieren",
          description: "Ignorieren hilft nicht, besser melden oder löschen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "In der Mail steht „InstaVibe“ – warum nutzen Betrüger oft bekannte Namen?",
      answers: [
        {
          text: "Weil es lustiger klingt",
          description: "Ihnen ist es egal, ob du es lustig findest oder nicht",
        },
        {
          text: "Damit du der Nachricht eher vertraust",
          description: "Bekannte Namen wirken vertrauenswürdig und täuschen Sicherheit vor.",
          isCorrect: true,
        },
        {
          text: "Um Werbung zu machen",
          description: "Werbung ist nicht das Ziel von Phishing.",
        },
        {
          text: "Weil sie so mehr Reichweite haben",
          description: "Reichweite spielt dabei keine Rolle.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Welche der folgenden Aussagen ist richtig?",
      answers: [
        {
          text: "Man sollte persönliche Daten nicht an unbekannte Empfänger schicken",
          description:
            "Only send personal information by email to verified recipients or people you know.",
          isCorrect: true,
        },
        {
          text: "Passwörter können ruhig geteilt werden",
          description: "Passwörter dürfen niemals geteilt werden.",
        },
        {
          text: "Jeder Link im Internet ist sicher",
          description: "Nicht jeder Link ist sicher — viele sind gefährlich.",
        },
        {
          text: "Man sollte immer auf „Jetzt anmelden“ klicken",
          description: "„Jetzt anmelden“-Buttons in Mails können Phishing-Fallen sein.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Was kann passieren, wenn du auf einen Phishing-Link klickst?",
      answers: [
        {
          text: "Dein Lieblingslied wird abgespielt",
          description: "Kein Lied wird gestartet.",
        },
        {
          text: "Deine Daten werden gestohlen",
          description: "Deine Daten können direkt abgegriffen werden.",
          isCorrect: true,
        },
        {
          text: "Du gewinnst ein Smartphone",
          description: "Gewinnversprechen sind meist Fake.",
        },
        {
          text: "Nichts — alles ist sicher",
          description: "Phishing-Links sind fast nie sicher.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Welche Nachricht ist verdächtig?",
      answers: [
        {
          text: "„Hey, wie geht's dir?“",
          description: "Klingt normal und unauffällig.",
        },
        {
          text: "„Du hast 1.000 Euro gewonnen, klicke hier!“",
          description: "Gewinnversprechen mit Link sind typisch für Betrug.",
          isCorrect: true,
        },
        {
          text: "„Wir treffen uns um 15 Uhr.“",
          description: "Ganz normale Verabredung.",
        },
        {
          text: "„Viel Erfolg bei der Klassenarbeit.“",
          description: "Keine verdächtige Nachricht, eher nett.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Im Spiel hast du viele Phishing-Nachrichten gesehen – gibt es die wirklich nur per E-Mail?",
      answers: [
        {
          text: "Ja",
          description: "Phishing gibt es auch über SMS, Social Media und Co.",
        },
        {
          text: "Nein",
          description: "Phishing kann über viele Kanäle kommen.",
          isCorrect: true,
        },
        {
          text: "Nur auf Handys",
          description: "Nicht nur auf Handys, auch am PC.",
        },
        {
          text: "Nur nachts",
          description: "Uhrzeit spielt keine Rolle.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Wenn du dir unsicher bist, ob eine Nachricht echt ist, solltest du…",
      answers: [
        {
          text: "Deine Daten angeben, um sicherzugehen",
          description: "Niemals persönliche Daten angeben.",
        },
        {
          text: "Jemanden fragen oder die echte Website aufrufen",
          description: "Immer erst nachfragen oder selbst die echte Seite öffnen.",
          isCorrect: true,
        },
        {
          text: "Die Nachricht weiterleiten",
          description: "Weiterleiten verbreitet die Gefahr nur.",
        },
        {
          text: "Die Nachricht liken",
          description: "Liken hilft hier gar nicht.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Was passiert oft, wenn du auf einen Phishing-Link klickst?",
      answers: [
        {
          text: "Du wirst auf eine gefälschte Website geleitet",
          description: "Du wirst auf eine gefälschte Seite geleitet, die deine Daten stiehlt.",
          isCorrect: true,
        },
        {
          text: "Du bekommst ein Geschenk",
          description: "Geschenke gibt es nicht bei Phishing.",
        },
        {
          text: "Du wirst aus dem Internet geworfen",
          description:
            "Du wirst nicht aus dem Internet geworfen, aber deine Daten könnten gestohlen werden.",
        },
        {
          text: "Du gewinnst eine Reise",
          description: "Gewinne wie Reisen sind häufig ein Phishing-Trick.",
        },
      ],
      timeLimit: 30,
    },
  ],
};

const photos: PhotosTranslation = {
  prologue: {},
  intro: {
    initialMessage:
      "Hey, du hast das peinliche Bild von mir sicher auch schon gesehen... kannst du mir bitte helfen?",
    notificationTitle: "Nachricht von Max",
    overlayTitle: "Max braucht dich!",
    overlayPrompt: "Wähle eine Aktion:",
    header: {
      avatarLabel: "S4",
      profileName: "CyberCareers",
      subtitle: "Gesponsert • Szene 4",
    },
    feedActions: {
      like: "Liken",
      chat: "Chat",
      share: "Teilen",
    },
    commentsLabel: "Kommentare",
    actions: [
      {
        id: "ignore",
        label: "Nichts tun und es ignorieren.",
        response: "Ignorieren lässt es nicht verschwinden. Ich fühle mich damit allein.",
        isCorrect: false,
      },
      {
        id: "confront_publicly",
        label: "Öffentlich kommentieren und den Poster zum Löschen auffordern.",
        response:
          "Das zieht vielleicht noch mehr Aufmerksamkeit auf das Bild und startet einen grösseren Streit. Ich will es nicht schlimmer machen.",
        isCorrect: false,
      },
      {
        id: "report_alone",
        label: "Das Foto ohne Rücksprache mit Max bei der App melden.",
        response:
          "Melden ist eine gute Idee, aber ich hätte mir gewünscht, dass du vorher mit mir sprichst. Es ist wichtig, dass du zu mir hältst.",
        isCorrect: false,
      },
      {
        id: "support_and_act",
        label: "Max fragen, wie es ihm geht, und gemeinsam beim Melden helfen.",
        response:
          "Danke, dass du zuerst bei mir nachfragst. Das bedeutet mir viel. Lass es uns zusammen melden.",
        isCorrect: true,
      },
    ],
  },
  miniGame: {
    title: "Post or not post",
    description:
      "Du hast gesehen, dass nicht jedes Bild ins Internet gehört. In diesem Spiel entscheidest du selber, drücke den rechten Knopf zum posten oder den linken Knopf zum nicht posten",
    allCorrect: "Perfekt! Du hast alles richtig gemacht!",
    minimumReached: "Sehr gut! Du hast die meisten richtig beantwortet!",
    insufficient: "Nicht schlecht, aber da geht noch mehr!",
    post: "Posten",
    notPost: "Nicht posten",
    couldPost: "Dieses Bild dürftest du posten.",
    shouldNotPost: "Dieses Bild sollte man lieber nicht posten.",
  },
  quiz: [
    {
      question:
        "Was ist der allererste Schritt, wenn dein Freund Max ein Foto von dir auf InstaVibe postet, das dir nicht gefällt?",
      answers: [
        {
          text: "Das Foto sofort bei InstaVibe melden",
          description:
            "Melden kann sinnvoll sein – aber zuerst solltest du direkt mit der Person sprechen, die es gepostet hat.",
        },
        {
          text: "Max in den Kommentaren beleidigen",
          description: "Beleidigungen verschlimmern die Situation nur und lösen das Problem nicht.",
        },
        {
          text: "Max freundlich in einer privaten Nachricht bitten, das Foto zu löschen",
          description:
            "Das ist der beste erste Schritt: Höflich und direkt fragen respektiert die Freundschaft und löst viele Probleme schnell.",
          isCorrect: true,
        },
        {
          text: "Nichts tun, ist ja nur ein Freund",
          description:
            "Wenn du dich unwohl fühlst, solltest du handeln – es ist dein Recht, über Bilder von dir mitzuentscheiden.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du hast ein lustiges Foto von Timo gemacht, auf dem er stolpert. Darfst du das ohne seine Erlaubnis auf InstaVibe posten?",
      answers: [
        {
          text: "Ja klar, solange es lustig ist, ist alles erlaubt",
          description:
            "Lustig zu sein reicht nicht als Grund – die abgebildete Person muss zustimmen.",
        },
        {
          text: "Nur, wenn du ihn nicht auf dem Bild markierst",
          description: "Auch ohne Markierung bleibt es sein Bild – er muss einverstanden sein.",
        },
        {
          text: "Nein, denn jede Person hat das ‚Recht am eigenen Bild‘",
          description:
            "Richtig: Ohne Einwilligung darfst du das Bild nicht posten – selbst wenn es harmlos wirkt.",
          isCorrect: true,
        },
        {
          text: "Ja, aber nur für deine engsten Freunde sichtbar",
          description:
            "Auch in einem privaten Kreis brauchst du seine Zustimmung, bevor du es teilst.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du hast Max gebeten, das Foto von dir zu löschen, aber er reagiert nicht. Was ist der nächste sinnvolle Schritt?",
      answers: [
        {
          text: "Sein Passwort hacken und das Bild selbst löschen",
          description: "Hacking ist illegal und verschlimmert die Situation massiv.",
        },
        {
          text: "Ein peinliches Foto von ihm posten, um es ihm heimzuzahlen",
          description: "Rache verschärft den Konflikt und verletzt ebenfalls seine Rechte.",
        },
        {
          text: "Das Foto bei InstaVibe melden, weil es ohne deine Zustimmung gepostet wurde",
          description:
            "Genau: Wenn jemand nicht reagiert, kannst du es der Plattform melden – besonders bei Bildern gegen deinen Willen.",
          isCorrect: true,
        },
        {
          text: "Deinen Account löschen",
          description:
            "Dein Konto zu löschen löst das eigentliche Problem nicht – nutze erst die vorhandenen Schutzfunktionen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Welches dieser Motive ist am sichersten, auf InstaVibe zu posten, ohne jemanden um Erlaubnis fragen zu müssen?",
      answers: [
        {
          text: "Ein Gruppenfoto von deiner Schulklasse",
          description:
            "Gruppenfotos enthalten mehrere Personen – du brauchst die Zustimmung aller oder solltest es lassen.",
        },
        {
          text: "Ein Foto von einem Fremden mit einem coolen T-Shirt",
          description:
            "Auch Fremde haben Persönlichkeitsrechte – du darfst sie nicht einfach veröffentlichen.",
        },
        {
          text: "Ein Foto von einem Sonnenuntergang am See",
          description: "Richtig: Naturaufnahmen ohne erkennbare Personen sind unproblematisch.",
          isCorrect: true,
        },
        {
          text: "Ein Foto von deinem kleinen Bruder beim Spielen",
          description:
            "Bei Kindern ist besondere Vorsicht angesagt – du brauchst die Zustimmung der Erziehungsberechtigten.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Jemand hat ein Bild von dir auf einem Fake-Profil hochgeladen und schreibt gemeine Dinge dazu. Was solltest du tun?",
      answers: [
        {
          text: "Dem Profil zurückschreiben und die Person beschimpfen",
          description:
            "Beschimpfungen helfen nicht – sie können sogar gegen dich verwendet werden.",
        },
        {
          text: "Das Profil sofort bei InstaVibe melden und mit deinen Eltern oder einem Lehrer sprechen",
          description:
            "Richtig: Melden und eine vertrauenswürdige Person einschalten ist der sicherste Weg.",
          isCorrect: true,
        },
        {
          text: "Nichts tun, das hört von alleine wieder auf",
          description: "Abzuwarten kann die Situation verschlimmern – handle frühzeitig.",
        },
        {
          text: "Deine Freunde bitten, die Person ebenfalls zu beleidigen",
          description: "Das eskaliert die Lage und verstösst wahrscheinlich gegen Regeln.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du möchtest ein Foto von deinem neuen Zeugnis posten, weil du stolz bist. Warum ist das keine gute Idee?",
      answers: [
        {
          text: "Weil andere neidisch auf deine Noten werden könnten",
          description: "Neid ist nicht das Hauptproblem – es geht um deine persönlichen Daten.",
        },
        {
          text: "Weil Zeugnisse langweilig aussehen und keine Likes bekommen",
          description: "Likes sind unwichtig – wichtiger ist, welche Daten sichtbar werden.",
        },
        {
          text: "Weil darauf private Daten wie dein voller Name, dein Geburtsdatum und der Name der Schule stehen",
          description:
            "Richtig: Zeugnisse enthalten sensible Informationen, die du nicht preisgeben solltest.",
          isCorrect: true,
        },
        {
          text: "Weil die Schulleitung das generell verbietet",
          description:
            "Vielleicht gibt es Regeln – entscheidend sind aber vor allem deine persönlichen Daten.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Das ‚Recht am eigenen Bild‘ bedeutet, dass…",
      answers: [
        {
          text: "…man nur professionelle Fotos von sich posten darf.",
          description: "Nein – es geht nicht um die Art des Fotos, sondern um Zustimmung.",
        },
        {
          text: "…grundsätzlich jede Person selbst entscheiden darf, ob Bilder von ihr veröffentlicht werden.",
          description:
            "Richtig: Ohne Einwilligung dürfen Fotos einer Person nicht allgemein veröffentlicht werden.",
          isCorrect: true,
        },
        {
          text: "…man für jedes Foto, das man macht, Geld verlangen kann.",
          description: "Das hat mit dem Recht am eigenen Bild nichts zu tun.",
        },
        {
          text: "…man das Recht hat, jedes Bild zu malen, das man möchte.",
          description:
            "Das betrifft nicht gemalte/erstellte Werke, sondern Fotoveröffentlichungen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Auf der Party von Lea wurde ein Foto gemacht, auf dem im Hintergrund jemandem ein peinliches Missgeschick passiert. Solltest du das Foto posten?",
      answers: [
        {
          text: "Ja, das ist lustig und alle werden darüber lachen",
          description:
            "Was für manche lustig ist, kann für andere verletzend sein – Rücksicht geht vor.",
        },
        {
          text: "Nein, weil es die Person im Hintergrund blossstellen und verletzen könnte",
          description: "Richtig: Respektiere die Privatsphäre und Gefühle anderer.",
          isCorrect: true,
        },
        {
          text: "Ja, aber nur, wenn man die Person im Hintergrund nicht gut erkennt",
          description:
            "Auch unscharf oder teilweise erkennbar kann es unangenehm oder identifizierbar sein.",
        },
        {
          text: "Vielleicht, aber du solltest einen lustigen Filter darüberlegen",
          description:
            "Ein Filter ändert nichts daran, dass du die Situation der Person öffentlich machst.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du hast ein Bild bei InstaVibe gemeldet, aber es passiert nichts. An wen kannst du dich ausserhalb der App wenden?",
      answers: [
        {
          text: "An niemanden, da kann man nichts mehr machen",
          description: "Doch – du hast immer Ansprechpersonen, die dir helfen können.",
        },
        {
          text: "An deine Follower, damit sie Druck auf die Person ausüben",
          description:
            "Öffentlicher Druck oder Shitstorms sind keine gute Lösung und können schaden.",
        },
        {
          text: "An den Hersteller von deinem Handy",
          description:
            "Der Gerätehersteller hat damit nichts zu tun – suche dir menschliche Unterstützung.",
        },
        {
          text: "An deine Eltern, Lehrer oder eine Beratungsstelle",
          description:
            "Richtig: Vertrauenspersonen und Beratungsstellen können unterstützen und weitere Schritte einleiten.",
          isCorrect: true,
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Warum ist es eine gute Idee, die automatische Standort-Markierung (Geotagging) bei Fotos zu deaktivieren, bevor du sie auf InstaVibe postest?",
      answers: [
        {
          text: "Weil die Fotoqualität dadurch besser wird",
          description: "Die Bildqualität wird durch Geotagging nicht beeinflusst.",
        },
        {
          text: "Weil man sonst weniger Likes für die Bilder bekommt",
          description: "Likes haben nichts mit Standortdaten zu tun.",
        },
        {
          text: "Weil sonst Fremde genau herausfinden können, wo du dich oft aufhältst",
          description:
            "Richtig: Standortdaten können Muster verraten (z. B. Wohnort, Schule) und ein Risiko darstellen.",
          isCorrect: true,
        },
        {
          text: "Weil es den Akku von deinem Handy schont",
          description:
            "Akkuschonung ist hier nicht der Hauptgrund – Datenschutz und Sicherheit stehen im Fokus.",
        },
      ],
      timeLimit: 30,
    },
  ],
};

const password: PasswordTranslation = {
  prologue: {
    classroom:
      "<T>[Im Computerraum. Du sitzt gespannt am Computer, neben deinen Freunden, und wartest auf Herrn Müller. Alle sind neugierig, was heute passiert.]</T>",
  },
  intro: {
    herrMueller1:
      "<B>Herr Müller (dein Lehrer):</B>\nSo, Leute. Heute machen wir mal was anderes – die Schule hat ein neues Webmail-System. Ihr bekommt jetzt alle eine eigene schulische E-Mail-Adresse.",
    herrMueller2:
      "(Herr Müller tippt auf der Tastatur, der Beamer zeigt die Startseite des Systems. Du spürst die Aufregung im Raum.)",
    herrMueller3:
      "<B>Herr Müller (dein Lehrer):</B>\nGeht auf mail.schule-netz.de und loggt euch mit dem Initialpasswort ein. Danach müsst ihr sofort ein neues, sicheres Passwort vergeben. Denkt daran: Sicherheit geht vor!",
    player1:
      "<B>[Du tippst die URL ein. Auf dem Bildschirm erscheint: „Willkommen bei SchulMail – Jetzt neues Passwort setzen“]</B>\nDu überlegst kurz, welches Passwort wirklich sicher ist.",
  },
  miniGame: {
    title: "Passwort Schredder",
    description: "Finde heraus, was starke Passwörter ausmacht und welche unsicher sind.",
    hint: "Aber denk dran: Ein starkes Passwort allein ist noch keine Garantie, dass du sicher bist!",
    endScreenScore: "Dein finaler Punktestand: ",
    tutorial: [
      {
        title: "Steuerung",
        message:
          "Bewege das Sägeblatt mit der Maus, per Touch oder mit der Tastatur (←/A nach links, →/D nach rechts).",
      },
      {
        title: "Passwörter",
        message:
          "Steuere das Sägeblatt zu den Passwörtern und zersäge sie - aber nur die schwachen!",
      },
      {
        title: "Punkte",
        message: "Zersäge keine starken Passwörter, sonst verlierst du Punkte!",
      },
    ],
  },
  quiz: [
    {
      question:
        "Herr Müller hat euch aufgetragen, ein neues, sicheres Passwort für eure Schul-E-Mail zu erstellen. Was macht ein solches Passwort wirklich sicher?",
      answers: [
        {
          text: "Dein Vorname und Geburtsjahr",
          description:
            "Ein Passwort, das aus deinem Vornamen und Geburtsjahr besteht, ist sehr leicht zu erraten. Vermeide persönliche Informationen!",
        },
        {
          text: "Mindestens 8 Zeichen, Gross- und Kleinbuchstaben, Zahlen und Sonderzeichen",
          description:
            "Ein sicheres Passwort sollte mindestens 8 Zeichen lang sein und eine Mischung aus Gross" +
            "- und Kleinbuchstaben, Zahlen und Sonderzeichen enthalten. Das macht es schwieriger, das Passwort zu knacken.",
          isCorrect: true,
        },
        {
          text: "„123456“",
          description:
            "123456“ ist eines der häufigsten und schwächsten Passwörter. Es kann in Sekunden gehackt werden.",
        },
        {
          text: "Der Name deines Haustiers",
          description:
            "Der Name deines Haustiers ist leicht zu erraten, besonders wenn es jemand kennt. Vermeide einfache Namen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Du hast jetzt ein sicheres Passwort für deine Schul-Mail und für InstaVibe. Wie oft solltest du solche wichtigen Passwörter ändern?",
      answers: [
        {
          text: "Nie",
          description:
            "Wenn du deine Passwörter nie änderst, wird dein Konto bei einem Diebstahl leicht angreifbar.",
        },
        {
          text: "Nur wenn du ein neues Handy hast",
          description:
            "Ein neues Handy bedeutet nicht automatisch, dass du dein Passwort ändern musst — wichtiger ist der Schutz bei Verdacht auf Datenklau.",
        },
        {
          text: "Regelmässig und bei Verdacht auf Missbrauch",
          description:
            "Regelmässiges Ändern deiner Passwörter und sofortiges Ändern bei Verdacht auf Missbrauch schützt deine Konten vor Angreifern.",
          isCorrect: true,
        },
        {
          text: "Immer, wenn du schlechte Laune hast",
          description: "Deine Laune hat nichts mit Passwortsicherheit zu tun.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Was ist ein Passwort-Manager?",
      answers: [
        {
          text: "Ein Programm, das Musik abspielt",
          description: " Musikprogramme haben nichts mit Passwörtern zu tun.",
        },
        {
          text: "Ein Spiel für dein Handy",
          description:
            " Ein Passwort-Manager ist kein Spiel, sondern ein Tool für deine Sicherheit.",
        },
        {
          text: "Ein Programm, das Passwörter sicher speichert",
          description:
            "Ein Passwort-Manager hilft dir, alle deine Passwörter sicher zu speichern und sich diese zu merken — du brauchst dir nur ein Master-Passwort merken.",
          isCorrect: true,
        },
        {
          text: "Ein Ordner auf dem Schreibtisch",
          description:
            "Ein Ordner auf dem Schreibtisch wäre unsicher und hat keine Schutzfunktionen wie ein richtiger Passwort-Manager.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Welches dieser Passwörter ist am sichersten?",
      answers: [
        {
          text: "Fussball123",
          description:
            "Zwar enthält es Buchstaben und Zahlen, aber es ist leicht zu erraten, vor allem wenn jemand weiss, dass du Fussball magst.",
        },
        {
          text: "H@u$M@u$2025!",
          description:
            "Dieses Passwort ist lang, kreativ und enthält Gross- und Kleinbuchstaben, Zahlen und Sonderzeichen – genau das macht es schwer zu knacken.",
          isCorrect: true,
        },
        {
          text: "987654321",
          description:
            "Das ist eine einfache Zahlenreihe und gehört zu den häufigsten Passwörtern – sehr unsicher.",
        },
        {
          text: "Hallo",
          description:
            "Ein einfaches Wort ohne Zahlen oder Sonderzeichen ist viel zu leicht zu erraten.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Wie kannst du dir ein sicheres Passwort gut merken?",
      answers: [
        {
          text: "Gar nicht — man sollte alle Passwörter gleich machen",
          description:
            "Gleiche Passwörter für alles zu verwenden ist sehr unsicher und kann leicht zum Datenklau führen.",
        },
        {
          text: "Indem du einen Satz bildest und von jedem Wort den ersten Buchstaben nimmst",
          description:
            "Ein Satz hilft dir, ein individuelles und sicheres Passwort zu erstellen, das du dir gut merken kannst, zum Beispiel: „Mein Hund liebt 3 grosse Knochen!“ → MhL3gK!",
          isCorrect: true,
        },
        {
          text: "Indem du es auf einen Zettel schreibst und an den Bildschirm klebst",
          description: "Ein Passwort auf einem sichtbaren Zettel ist leicht zu stehlen.",
        },
        {
          text: "Indem du nur Zahlen verwendest",
          description:
            "Ein sicheres Passwort sollte Zahlen, Buchstaben und Sonderzeichen enthalten, nicht nur Zahlen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Warum sind Sonderzeichen in einem Passwort wichtig?",
      answers: [
        {
          text: "Sie machen es leichter zu merken",
          description:
            "Sonderzeichen machen Passwörter oft etwas komplizierter, aber nicht unbedingt leichter zu merken.",
        },
        {
          text: "Sie erhöhen die Sicherheit, weil es mehr Möglichkeiten gibt",
          description:
            "Sonderzeichen sorgen dafür, dass es viel mehr Kombinationen gibt – dadurch wird das Passwort viel schwerer zu knacken.",
          isCorrect: true,
        },
        {
          text: "Sie sind hübsch",
          description: "Das Aussehen spielt keine Rolle — Sicherheit ist entscheidend.",
        },
        {
          text: "Sie verringern die Passwort-Länge",
          description: "Sonderzeichen verkürzen das Passwort nicht, sie machen es nur stärker.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Welche dieser Aussagen stimmt?",
      answers: [
        {
          text: "Ein sicheres Passwort sollte so kurz wie möglich sein",
          description:
            "Kurze Passwörter sind viel leichter zu erraten oder zu knacken — je länger, desto besser!",
        },
        {
          text: "Man sollte Passwörter mit Freunden teilen",
          description:
            "Passwörter sind privat und sollten niemals geteilt werden, auch nicht mit Freunden.",
        },
        {
          text: "Ein Passwort sollte möglichst lang und komplex sein",
          description:
            "Ein langes und komplexes Passwort mit Buchstaben, Zahlen und Sonderzeichen ist viel sicherer.",
          isCorrect: true,
        },
        {
          text: "Ein Passwort braucht keine Grossbuchstaben",
          description:
            "Grossbuchstaben erhöhen die Sicherheit, weil sie mehr Möglichkeiten bei der Passwortkombination schaffen.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Stell dir vor, ein Mitschüler schaut dir über die Schulter und kennt jetzt dein Passwort für die Schul-Mail. Was könnte er damit anstellen?",
      answers: [
        {
          text: "Er kann sich als dich ausgeben und deine Daten missbrauchen",
          description:
            "Wer dein Passwort kennt, kann dein Konto übernehmen, Nachrichten verschicken, Einkäufe machen oder private Daten stehlen.",
          isCorrect: true,
        },
        {
          text: "Er kann dir einen Kuchen backen",
          description: "Dein Passwort hat nichts mit Kuchenbacken zu tun.",
        },
        {
          text: "Er kann dein Passwort löschen",
          description:
            "Allein das Passwort kennen reicht nicht aus, um es einfach zu löschen – der Schaden entsteht durch Zugang zu deinem Konto.",
        },
        {
          text: "Er kann dein Handy anrufen",
          description: "Dein Passwort hat keinen Einfluss auf Telefonanrufe.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Wenn du ein Passwort aufschreibst, wo solltest du es aufbewahren?",
      answers: [
        {
          text: "Direkt neben dem Computer",
          description:
            "Ein Passwort offen neben dem Computer ist leicht für andere zu finden und zu stehlen.",
        },
        {
          text: "In einem öffentlichen Chat",
          description:
            "In einem öffentlichen Chat können viele Menschen mitlesen – das ist sehr unsicher.",
        },
        {
          text: "In einem sicheren Ort, den nur du kennst",
          description:
            "Wenn du dein Passwort aufschreibst, dann an einem geheimen, sicheren Ort, den nur du kennst," +
            " z. B. in einem abgeschlossenen Fach oder verschlüsselten Dokument.",
          isCorrect: true,
        },
        {
          text: "Auf Social Media posten",
          description: "Passwörter darf man niemals posten – das wäre eine Einladung für Hacker.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Sowohl dein neuer Schul-Mail-Account als auch InstaVibe bieten Zwei-Faktor-Authentifizierung (2FA) an. Was ist der grösste Vorteil davon?",
      answers: [
        {
          text: "Man braucht gar kein Passwort mehr",
          description:
            "Du brauchst immer noch dein Passwort, zusätzlich wird aber eine zweite Bestätigung verlangt.",
        },
        {
          text: "Es gibt eine zweite Sicherheitsebene zusätzlich zum Passwort",
          description:
            "Mit Zwei-Faktor-Authentifizierung bist du doppelt geschützt, zum Beispiel durch ein Passwort und einen Code auf deinem Handy.",
          isCorrect: true,
        },
        {
          text: "Sie verlängert das Passwort automatisch",
          description:
            "Die Länge des Passwortes bleibt gleich — es wird nur eine zusätzliche Prüfung hinzugefügt.",
        },
        {
          text: "Man bekommt täglich ein neues Passwort",
          description:
            "Dein Passwort bleibt gleich, aber der Bestätigungscode ändert sich bei jeder Anmeldung.",
        },
      ],
      timeLimit: 30,
    },
  ],
};

export const scenes = {
  socialMedia,
  cookie,
  phishing,
  photos,
  password,
};
