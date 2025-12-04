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
      "<T>[Your bedroom, bathed in soft evening light. Your phone buzzes — Max is messaging the group again. You wonder what he has discovered this time...]</T>",
    innerDialog:
      "<T>Max always finds the coolest stuff first. I should see what he's excited about now.</T>",
  },
  intro: {
    chatGroupName: "School Group",
    chat1: {
      characterName: "Max",
      dialog:
        "Guys! The new social media platform InstaVibe is amazing! You HAVE to join, it's going to be huge! 🔥🔥🔥",
    },
    chat2: {
      characterName: "Lea",
      dialog:
        "Another new platform? Max, I can barely keep up with HoloSnap 😅 Are you sure it's worth it?",
    },
    chat3: {
      characterName: "Timo",
      dialog: "If Max is hyping it, you know it's going to blow up anyway 😄 Got a link?",
    },
    chat4: {
      characterName: "Max",
      dialog:
        "Already got it! Trust me on this one - InstaVibe has this whole different energy. Here's the link!",
    },
    player1: {
      dialog:
        "<B>[You pause, thoughtful mood...]</B>\nInstaVibe... I've heard good things, but I should be careful. I’ll just have a quick look before going to bed.",
    },
    player2: {
      dialog:
        "<B>[After downloading InstaVibe]</B>\nOkay, let's see what all the hype is about. Time to explore, but I'll keep Max's advice in mind about being smart online.",
    },
  },
  miniGame: {
    youHave: "You have",
    objectsFound: "objects found!",
    all: "all",
    title: "Minigame: Hidden Objects",
    description:
      "Find all the objects you shouldn't post on InstaVibe. Remove them from the picture before time runs out and the picture is being published!",
    miniGameGiveUp: "Give up",
    tutorial: [
      {
        title: "Find objects",
        message:
          "Click or tap on the object you have found. If it is correct, it will disappear and you will hear a sound.",
      },
      {
        title: "Score",
        message: "In the top right corner, you'll see how many objects you have already found.",
      },
      {
        title: "Time limit",
        message:
          'Watch the countdown timer. If you can\'t find any more objects, you can also press the "Give up" button.',
      },
    ],
  },
  quiz: [
    {
      question:
        "Once you've installed InstaVibe – what does it actually mean if your profile is “public”?",
      answers: [
        {
          text: "Only you can see your posts.",
          description:
            "If your profile is public, not only you but everyone can see your posts - even strangers.",
        },
        {
          text: "Anyone on the internet can see your posts.",
          description:
            "A public profile means that anyone, even people you don't know, can see everything you post - photos, videos, texts.",
          isCorrect: true,
        },
        {
          text: "Only your friends can see your posts.",
          description:
            'If you only want your friends to see your posts, you have to set your profile to "private".',
        },
        {
          text: "Only your family can see your posts.",
          description:
            "With a public profile, not only your family but really every internet user can see your content.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You want to write a cool bio on InstaVibe – why shouldn’t you include personal information?",
      answers: [
        {
          text: "It's boring for others.",
          description:
            "Whether something is interesting or not doesn't matter — it's about safety, not entertainment.",
        },
        {
          text: "Strangers could misuse this information.",
          description:
            "If you, for example, write your age, school, or place of residence in your bio, strangers can use this info to harm you - for example, to manipulate you or send you targeted, dangerous messages.",
          isCorrect: true,
        },
        {
          text: "Nobody actually reads the bio.",
          description:
            "Many people do look at the bio, especially when you get new followers. Strangers often read it first.",
        },
        {
          text: "You can't use emojis.",
          description:
            "You can use emojis in bios - that's not the problem. The danger lies in including too much personal information.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "After you've posted your first InstaVibe, how can you protect your photos from prying eyes?",
      answers: [
        {
          text: "Turn off your location settings",
          description:
            "Turning off location settings is a reasonable choice, but it doesn't directly protect your photos from unauthorised views.",
        },
        {
          text: "Adjust your privacy settings",
          description:
            "If you adjust your privacy settings correctly (for example, set your profile to “private” or choose who can see your posts), only selected people can see your photos.",
          isCorrect: true,
        },
        {
          text: "Add lots of friends",
          description:
            "The more people you add, the greater the risk that someone will misuse or share your pictures.",
        },
        {
          text: "Like every post",
          description: "Liking doesn't protect your own photos in any way.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Max pointed out a suspicious profile to you – how can you tell if it’s fake?",
      answers: [
        {
          text: "It has a verified checkmark.",
          description:
            "A verified checkmark usually means that the profile is real - fake profiles almost never have such a thing.",
        },
        {
          text: "It has many photos and real friends.",
          description:
            "Many real friends and posts are more likely to be a sign of a real profile.",
        },
        {
          text: "It has very little information, unfamiliar pictures, and hardly any posts",
          description:
            "Fake profiles often look empty, use stock photos or other people's pictures, and have no real content.",
          isCorrect: true,
        },
        {
          text: "It has a funny name.",
          description:
            "A funny name alone says nothing about whether a profile is genuine or fake.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "While scrolling through InstaVibe – how can you make sure your privacy truly stays protected?",
      answers: [
        {
          text: "Post everything publicly",
          description:
            "If everything is public, strangers can see all your content as well - that's unsafe.",
        },
        {
          text: "Make your posts visible to friends only",
          description:
            "If you make your posts visible to friends only, you protect your data and avoid exposing it to strangers.",
          isCorrect: true,
        },
        {
          text: "Like every post",
          description: "Liking has nothing to do with protecting your own data.",
        },
        {
          text: "Send your address to strangers",
          description:
            "Never give personal data like your address to strangers - it's extremely dangerous.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You’re thinking about posting Max’s message – why is this a bad idea without his consent?",
      answers: [
        {
          text: "Because nobody is interested",
          description:
            "It's not about whether someone is interested or not, but about privacy and respect.",
        },
        {
          text: "Because it slows down the phone",
          description: "A screenshot doesn't slow down your phone, that's not the problem.",
        },
        {
          text: "Because it's unfair and often forbidden",
          description:
            "Private messages are confidential - publishing them without consent is unfair and can even have legal consequences.",
          isCorrect: true,
        },
        {
          text: "Because it gets fewer likes",
          description: "Likes have nothing to do with the right to privacy.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Which statement is actually true when it comes to handling other people’s photos on InstaVibe?",
      answers: [
        {
          text: "You're allowed to post photos of everyone without any problems.",
          description:
            "Every person has the right to their own image - you are not allowed to just post photos like that.",
        },
        {
          text: "You need the permission of the people in the picture.",
          description:
            "Before you publish a picture, you must obtain the consent of all the people in it - this is both fair and often legally required.",
          isCorrect: true,
        },
        {
          text: "You're always allowed to post pictures of friends.",
          description:
            "Your friends also have privacy rights and can decide whether a picture should be posted online or not.",
        },
        {
          text: "As long as you don't tag anyone, everything is allowed.",
          description:
            "Whether someone is tagged or not doesn't change the fact that you have to ask for permission first.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "You receive a weird message from a stranger – how should you react?",
      answers: [
        {
          text: "Ignore it and do nothing",
          description: "Ignoring often doesn't help, the message remains there and can get worse.",
        },
        {
          text: "Share and forward it",
          description: "Forwarding it only spreads more hate or risk.",
        },
        {
          text: "Block and report it",
          description:
            "It's best to block the person immediately and report the message to the provider - that's how effective action is taken against such users.",
          isCorrect: true,
        },
        {
          text: "Insult them back",
          description:
            "Replying with insults makes everything worse and can also get you into trouble.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "A stranger sends you a friend request on InstaVibe – why should you be cautious?",
      answers: [
        {
          text: "Because otherwise, you will have too many friends",
          description: "It's not about how many friends you have, but about safety.",
        },
        {
          text: "Because strangers could spy on your info",
          description:
            "If you give strangers access to your profile, they can see your personal data and maybe even misuse it.",
          isCorrect: true,
        },
        {
          text: "Because your battery will run out otherwise",
          description:
            "Your friends have no influence on the battery of your phone. It's about safety, not the battery.",
        },
        {
          text: "Because it's embarrassing",
          description:
            "It's not embarrassing to ignore friend requests that you don't want to accept. It's about your privacy and protection.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You’re thinking about sharing your location in your profile – what could happen if you do that?",
      answers: [
        {
          text: "Your battery charges faster.",
          description: "The location has no influence on the charging speed of your battery.",
        },
        {
          text: "Strangers could find or follow you.",
          description:
            "If you share your real location, strangers can find out where you are and maybe even follow you or contact you in an uncomfortable way.",
          isCorrect: true,
        },
        {
          text: "You will receive a gift.",
          description: "Sharing your location does not bring gifts - it can put you in danger.",
        },
        {
          text: "Your profile will be deleted.",
          description:
            "Your profile will not be deleted, but sharing your location can endanger your safety.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "After setting up your InstaVibe profile – why shouldn’t you post your phone number there?",
      answers: [
        {
          text: "Because nobody is interested in it",
          description:
            "It's not about whether someone is interested in it or not. Privacy and safety are crucial.",
        },
        {
          text: "Because strangers could harass or cheat on you",
          description:
            "If you publicly display your phone number, strangers could call you, harass you or even cheat on you.",
          isCorrect: true,
        },
        {
          text: "Because you will get fewer likes",
          description: "The number of likes has nothing to do with your phone number.",
        },
        {
          text: "Because it will be automatically deleted",
          description:
            "Your phone number will not be automatically deleted, but it can be misused by others.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You want to spice up your profile – which information should you rather NOT share?",
      answers: [
        {
          text: "Your favorite food",
          description:
            "Your favorite food is not confidential information and does not pose a danger.",
        },
        {
          text: "Your address",
          description:
            "You should never share your address on social media as strangers can see it and it could endanger your safety.",
          isCorrect: true,
        },
        {
          text: "A photo of your dog",
          description:
            "A photo of your dog is completely unproblematic as long as it doesn't reveal any private information.",
        },
        {
          text: "A sunset",
          description: "A photo of a sunset is unproblematic and does not affect your privacy.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You’re planning a new post – which photo shares sensitive personal information and should NOT be posted?",
      answers: [
        {
          text: "Your favorite food",
          description:
            "Your favorite food is not confidential information and does not pose a danger.",
        },
        {
          text: "Your address",
          description:
            "You should never share your address on social media as strangers can see it, which could endanger your safety.",
          isCorrect: true,
        },
        {
          text: "A photo of your dog",
          description:
            "A photo of your dog is completely unproblematic as long as it doesn't reveal any private information.",
        },
        {
          text: "A sunset",
          description: "A photo of a sunset is unproblematic and does not affect your privacy.",
        },
      ],
      timeLimit: 30,
    },
  ],
};

const cookie: CookieTranslation = {
  intro: {
    buttonTextAcceptCookies: "Accept all cookies",
    buttonTextManageCookies: "Manage cookies",
    cookieInfo1:
      "We and selected third parties use cookies or similar technologies, as described in the Cookie Policy. You can consent to the use of such technologies by clicking the 'Accept' button.",
    player1: {
      dialog:
        "Hmm… why should I accept these cookies? I’d rather manage the cookies and see which ones aren't necessary.",
    },
    hint: {
      dialog: "I can’t continue yet. Something needs to be activated that the website requires.",
    },
    cookies: {
      title: "Want a cookie?",
      essentialTitle: "Essential:",
      nonEssentialTitle: "Non-essential:",
      essential: {
        login: "Login",
        security: "Security",
        language: "Language",
        system: "System",
      },
      nonEssential: {
        tracking: "Tracking",
        advertising: "Advertising",
        marketing: "Marketing",
        thirdParty: "Third Party",
        social: "Social Media",
        remarketing: "Remarketing",
        analytics: "Analytics",
      },
      cookieInfo2:
        "You can manage your cookies here. Some are essential and cannot be deactivated.",
      cookieInfo3: "I cannot continue yet. One or more cookies still need to be deactivated.",
      buttonTextContinue: "Continue",
    },
  },
  miniGame: {
    title: "Cookie Cutter",
    description: "Destroy all bad cookies!",
    goodCookieTexts: ["Session", "Cart", "Security", "Language", "System"],
    badCookieTexts: [
      "Tracking",
      "Advertisement",
      "Marketing",
      "Third Party",
      "Social Media",
      "Remarketing",
      "Analytics",
    ],
    tutorial: [
      {
        title: "Cookie Cutter",
        message: "Swipe across the screen to destroy bad cookies.",
      },
      {
        title: "The time's running!",
        message: "Keep the timer in mind.",
      },
      {
        title: "Score",
        message:
          "You can see how many good cookies you've destroyed by looking at your score. If you destroy a good cookie, you get negative points.",
      },
    ],
  },
  quiz: [
    {
      question: "What are cookies used for on the internet?",
      answers: [
        {
          text: "So websites can remember things (e.g., login, cart)",
          description:
            "Cookies store information so that websites can recognize you — like staying logged in or keeping items in your cart.",
          isCorrect: true,
        },
        {
          text: "To make your computer run faster",
          description: "Cookies do not improve your computer's hardware performance.",
        },
        {
          text: "To get more points in video games",
          description: "Cookies do not affect your game scores.",
        },
        {
          text: "To automatically get updates",
          description: "Updates are not controlled by cookies.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "What are tracking cookies?",
      answers: [
        {
          text: "Cookies that track your exact location",
          description: "Tracking cookies typically save browsing behaviour, not precise location.",
        },
        {
          text: "Cookies that track which websites you visit to tailor ads",
          description:
            "Tracking cookies record your browsing activities to personalize advertising.",
          isCorrect: true,
        },
        {
          text: "Cookies that store your password",
          description: "Passwords are not stored in tracking cookies.",
        },
        {
          text: "Cookies that prevent from viruses",
          description: "Cookies do not protect against malware.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Why does InstaVibe ask you to accept cookies the first time you open it?",
      answers: [
        {
          text: "So you get more likes",
          description: "Likes have nothing to do with cookie consent.",
        },
        {
          text: "Because otherwise the app doesn't know if you like InstaVibe",
          description: "Cookie prompts are not about your preferences for other apps.",
        },
        {
          text: "Because many countries have laws that protect you",
          description: "Laws like the GDPR require consent so you have control over your data.",
          isCorrect: true,
        },
        {
          text: "So your phone doesn't crash",
          description: "Phone stability does not depend on cookies.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "What would be harder on InstaVibe without cookies?",
      answers: [
        {
          text: "Staying logged in and opening your profile directly",
          description:
            "Without cookies, you would need to log in more often because your session wouldn’t be remembered.",
          isCorrect: true,
        },
        {
          text: "Editing photos with filters",
          description: "Filters do not depend on cookies.",
        },
        {
          text: "Uploading videos",
          description: "Uploads work regardless of cookies.",
        },
        {
          text: "Sending messages",
          description: "Messaging typically doesn't require cookies.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Which cookies are helpful?",
      answers: [
        {
          text: "Login, Tracking, Analytics, System",
          description: "Not all of these are equally helpful or necessary.",
        },
        {
          text: "System, Login, Advertising",
          description: "Advertising is not required to provide core features.",
        },
        {
          text: "Language, System, Security, Login",
          description:
            "These categories help with language settings, security, and login — they are useful.",
          isCorrect: true,
        },
        {
          text: "None of the answers are correct",
          description: "There is a correct answer.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "What does InstaVibe need system cookies for?",
      answers: [
        {
          text: "So you get more likes",
          description: "Likes have nothing to do with system cookies.",
        },
        {
          text: "So you see ads for shoes",
          description: "That's the role of marketing cookies, not system cookies.",
        },
        {
          text: "To make your phone run faster",
          description: "System cookies don't affect device performance.",
        },
        {
          text: "So the app knows you're logged in and can load your photos",
          description:
            "Necessary/system cookies support core functions like session state and loading content.",
          isCorrect: true,
        },
      ],
      timeLimit: 30,
    },
    {
      question: "What happens if you disable InstaVibe's system cookies?",
      answers: [
        {
          text: "The app won't work properly.",
          description:
            "Without necessary cookies, core features like login or page loading may stop functioning properly.",
          isCorrect: true,
        },
        {
          text: "You'll see fewer ads.",
          description: "This mainly concerns marketing cookies, not system cookies.",
        },
        {
          text: "You'll get more likes.",
          description: "Cookies do not influence likes.",
        },
        {
          text: "You can keep posting but without filters",
          description: "Filters do not depend on system cookies.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Why are analytics cookies important for InstaVibe?",
      answers: [
        {
          text: "So your friends can like faster",
          description: "Likes are not affected by analytics cookies.",
        },
        {
          text: "So the app knows which features are popular and can improve them",
          description:
            "Analytics cookies show which areas are used, helping the team improve the app.",
          isCorrect: true,
        },
        {
          text: "So your phone has more storage",
          description: "Cookies do not increase device storage.",
        },
        {
          text: "So you automatically get followers",
          description: "Analytics do not lead to more followers.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "What do marketing cookies on InstaVibe do?",
      answers: [
        {
          text: "They make your videos more popular.",
          description: "Popularity isn't controlled by cookies.",
        },
        {
          text: "They store which filters you use.",
          description: "That's more of a settings/feature topic, not marketing.",
        },
        {
          text: "They ensure your profile stays private.",
          description: "Privacy settings are independent of marketing cookies.",
        },
        {
          text: "They show ads related to what you view (e.g. sportswear if you visit many sports pages.)",
          description:
            "Marketing cookies personalize advertising based on your browsing behaviour.",
          isCorrect: true,
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Which type of cookies does InstaVibe use to see which features are used most (e.g. Stories, Reels, messages)?",
      answers: [
        {
          text: "Chocolate cookies",
          description: "Tasty, but not what we mean.",
        },
        {
          text: "Marketing cookies",
          description: "Marketing cookies are mainly for ad personalization.",
        },
        {
          text: "Analytics cookies",
          description:
            "Analytics cookies measure usage and help understand which features are popular.",
          isCorrect: true,
        },
        {
          text: "System cookies",
          description: "System cookies are for core functions, not analytics.",
        },
      ],
      timeLimit: 30,
    },
  ],
};

const phishing: PhishingTranslation = {
  prologue: {
    bedroom:
      "<T>[The next morning: You're getting ready for school when you receive an InstaVibe notification. After yesterday's setup, you're curious who might be reaching out...]</T>",
  },
  intro: {
    player1: {
      dialog:
        "Someone's messaging me on InstaVibe already? That was so fast... I wonder if it's one of my friends.",
    },
    chat1: {
      characterName: "Jonas M. (10B)",
      dialog:
        "Hey there! I saw you've just joined InstaVibe - welcome! I'm organizing a school event and I need the class list with the contact info. Do you mind sharing it? That would really help me!",
    },
    player2: {
      dialog:
        "Jonas from 10B? I don't think we've actually met... This seems a bit too direct for someone I don't know. Should I trust him?",
    },
  },
  miniGame: {
    title: "Save the Fish - Spot the Phishing!",
    description: `Not everything on the internet is real - this also applies underwater!
                  Baits with messages fall into the sea. Navigate the diver to the fishing hooks by clicking, read the
                  messages, and decide: Is it phishing or not?`,
    hint: "Every wrong decision puts your fish in danger - so be careful!",
    startButton: "Let's go!",
    legit: "Real",
    phishing: "Phishing",
    gameOver: "Game over",
    success:
      "Well done! You've helped the fish avoid dangerous baits and stay safe. This is how you protect yourself from phishing in real life by staying alert.",
    failure:
      "Oh no! The fish has eaten too many dangerous messages and didn't make it. Just like on the internet, a wrong click can cause great harm.",
    phishingMessages: [
      {
        type: "email",
        sender: "support@instavibe.com",
        text: "Your account has been suspended due to suspicious activities. Please log in here to unlock it.",
        isPhishing: true,
      },
      {
        type: "email",
        sender: "prize@streamfest.io",
        text: "Congratulations! You've won 3 months of free streaming. Claim it now.",
        isPhishing: true,
      },
      {
        type: "email",
        sender: "update@gameworld.io",
        text: "A new update is required. Download it here to continue playing.",
        isPhishing: true,
      },
      {
        type: "email",
        sender: "verification@instavibe-support.com",
        text: "Verify your InstaVibe account now, or it will be deactivated.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+49 1521 4455667",
        text: "Hey, it's me, from school. Can you send me your InstaVibe login? I need to check something.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+43 660 9876543",
        text: "Your package could not be delivered. Confirm your address here.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+41 76 123 4567",
        text: "You've won a prize in a contest! Claim your prize now.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+31 612345678",
        text: "Unauthorized access to your account detected. Secure your account now.",
        isPhishing: true,
      },
      {
        type: "sms",
        sender: "+33 612 345 678",
        text: "Invoice not paid. Make the payment through this link.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@instavibe_giveaway",
        text: "You are one of our top fans! Win exclusive InstaVibe merch now. Just fill out this form.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@teachersgroup_official",
        text: "Can you send me the test answers again? I lost them. Here's the link.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@free_gamecoins",
        text: "Free coins for your favorite game - exclusively for InstaVibe users!",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@instavibe_support_admin",
        text: "Please enter your login details to avoid losing access.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@event_official",
        text: "Free tickets for the concert! Only for the first 100 - be quick!",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@instavibe_warning",
        text: "Your account has been reported. View complaint here.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@brand_support_fake",
        text: "To confirm your last post: Please enter your password here.",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@randomuser324",
        text: "Hey, someone is using your pictures on InstaVibe. Check this out!",
        isPhishing: true,
      },
      {
        type: "chat",
        sender: "@instavibe.alert",
        text: "Due to high demand, you need to log in again. Click here.",
        isPhishing: true,
      },
      {
        type: "email",
        sender: "support@instavibe.com",
        text: "Your registration has been successful. Welcome to InstaVibe!",
        isPhishing: false,
      },
      {
        type: "email",
        sender: "info@instavibe.com",
        text: "We have sent you a confirmation email. Please confirm your registration.",
        isPhishing: false,
      },
      {
        type: "sms",
        sender: "+49 1521 4455667",
        text: "Your password has been changed successfully. You can log in now.",
        isPhishing: false,
      },
      {
        type: "sms",
        sender: "+43 660 9876543",
        text: "We have sent out a new newsletter. Check it out!",
        isPhishing: false,
      },
      {
        type: "chat",
        sender: "@instavibe_support",
        text: "How can we help you? If you have any questions, feel free to contact us.",
        isPhishing: false,
      },
      {
        type: "chat",
        sender: "@instavibe_team",
        text: "Latest updates on InstaVibe. Check out the new features!",
        isPhishing: false,
      },
    ],
    tutorial: [
      {
        title: "Swimming",
        message: "Navigate and hold the arrow to swim to your desired spot or use the arrow keys.",
      },
      {
        title: "Phishing envelopes",
        message: "Swim near an envelope to open it",
      },
      {
        title: "Read message",
        message: "Decide if it's a bait or not.",
      },
      {
        title: "Bad choice",
        message: "Wrong choices will harm the fish.",
      },
      {
        title: "Good choice",
        message: "Right choices will heal the fish.",
      },
      {
        title: "Fish health",
        message: "The goal is to keep the fish alive.",
      },
    ],
  },
  quiz: [
    {
      question:
        "While checking your emails, a suspicious message appears – could it be a phishing attempt? But what is phishing?",
      answers: [
        {
          text: "An online game",
          description: "Phishing is not a game, it's a scam method.",
        },
        {
          text: "The attempt to obtain personal data",
          description:
            "In phishing, fraudsters try to obtain confidential data such as passwords, account details or access data via fake emails, websites or messages.",
          isCorrect: true,
        },
        {
          text: "A music genre",
          description: "Phishing has nothing to do with music.",
        },
        {
          text: "An antivirus program",
          description:
            "An antivirus program protects against viruses, but sometimes also detects phishing attempts. However, phishing itself is a type of scam.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Max wasn’t sure about an email – how could he have recognized it was phishing?",
      answers: [
        {
          text: "It comes from an official email address.",
          description: "Not a sign of phishing, official-looking addresses appear trustworthy.",
        },
        {
          text: "It comes from an unusual or incorrect sender address.",
          description: "Unusual or faulty senders are a strong indication of phishing.",
          isCorrect: true,
        },
        {
          text: "The subject contains colourful smileys.",
          description: "Smileys alone do not indicate phishing.",
        },
        {
          text: "It includes a friendly greeting.",
          description: "Friendly greetings are also used in genuine emails.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "The message seems urgent – what do phishing scammers often write to pressure you into reacting?",
      answers: [
        {
          text: "Praise for your secure behavior",
          description: "Praise is rarely used to apply pressure.",
        },
        {
          text: "A threat to suspend your account",
          description: "Threats like account suspension create stress and tempt to click.",
          isCorrect: true,
        },
        {
          text: "A coupon code",
          description: "Coupons are meant to lure you in but usually don't apply acute pressure.",
        },
        {
          text: "A funny cat picture",
          description: "Funny pictures are harmless and not a typical phishing tool.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Which of these characteristics do NOT indicate a phishing email?",
      answers: [
        {
          text: "Unexpected email with links",
          description: "Unexpected emails with links are typical for phishing.",
        },
        {
          text: "Request for your password",
          description: "Phishing emails often ask for passwords.",
        },
        {
          text: "Spelling mistakes and strange wordings",
          description: "Poor language and mistakes are a common feature.",
        },
        {
          text: "Message from your best friend",
          description: "Messages from real friends are not a typical sign of phishing.",
          isCorrect: true,
        },
      ],
      timeLimit: 30,
    },
    {
      question: "The phishing email asks for information – which data are scammers usually after?",
      answers: [
        {
          text: "Your favorite song",
          description: "Your preferences are not of interest to scammers.",
        },
        {
          text: "Your bank details and passwords",
          description: "Bank details and passwords are the main target of phishing.",
          isCorrect: true,
        },
        {
          text: "Your favorite food",
          description: "Favorite food is of no value to fraudsters.",
        },
        {
          text: "Your sports grades",
          description: "Sports grades are of no interest to fraudsters.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "You receive an email that seems suspicious – what’s the best way to respond?",
      answers: [
        {
          text: "Click the link and check",
          description: "Clicking the link can be dangerous.",
        },
        {
          text: "Delete or report the message",
          description: "Best to directly delete or report it.",
          isCorrect: true,
        },
        {
          text: "Reply quickly",
          description: "Replying gives fraudsters feedback.",
        },
        {
          text: "Ignore the message",
          description: "Ignoring doesn't help, better to report or delete it.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "The email mentions “InstaVibe” – why do scammers often use well-known names?",
      answers: [
        {
          text: "Because it sounds funnier",
          description: "They don't care if you find it funny or not.",
        },
        {
          text: "So you trust the message more",
          description: "Familiar names seem trustworthy and create a false sense of security.",
          isCorrect: true,
        },
        {
          text: "To advertise",
          description: "Advertising is not the goal of phishing.",
        },
        {
          text: "Because they have more reach this way.",
          description: "Reach doesn't play a role here.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Which of the following statements is correct?",
      answers: [
        {
          text: "You should never send personal data to strangers by email",
          description: "If you’re unsure, use the official website or ask a trusted adult/teacher.",
          isCorrect: true,
        },
        {
          text: "Passwords can be shared.",
          description: "Passwords should never be shared.",
        },
        {
          text: "Every link on the internet is safe.",
          description: "Not every link is safe - many of them are dangerous.",
        },
        {
          text: "You should always click on 'Sign up now'.",
          description: "'Sign up now' buttons in emails can be phishing traps.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "What can happen if you click on a phishing link?",
      answers: [
        {
          text: "Your favorite song will be played.",
          description: "No, your favorite song probably won’t start .",
        },
        {
          text: "Your data will be stolen.",
          description: "Yes, your data could directly be stolen.",
          isCorrect: true,
        },
        {
          text: "You will win a smartphone.",
          description: "Prize promises are usually a scam.",
        },
        {
          text: "Nothing - my data is safe.",
          description: "Phishing links are almost always unsafe.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Which message seems suspicious?",
      answers: [
        {
          text: "Hey, how are you?",
          description: "Seems normal and harmless.",
        },
        {
          text: "You've won 1,000 euros - click here!",
          description: "Prize promises with a link are commonly scams.",
          isCorrect: true,
        },
        {
          text: "We're meeting at 3 p.m.",
          description: "A perfectly ordinary appointment.",
        },
        {
          text: "Good luck with the class test.",
          description: "This seems like a friendly message, not suspicious.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "In the game, you saw lots of phishing messages – do they really only come by email?",
      answers: [
        {
          text: "Yes",
          description: "Phishing also happens via SMS, social media, and othr platforms.",
        },
        {
          text: "No",
          description: "Phishing can come through many channels.",
          isCorrect: true,
        },
        {
          text: "Only on mobile phones",
          description: "Phishing can happen on both mobile phones and PCs.",
        },
        {
          text: "Only at night",
          description: "The time doesn't matter.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "If you're unsure whether a message is authentic, you should...",
      answers: [
        {
          text: "Provide your data to be sure.",
          description: "Never share personal data.",
        },
        {
          text: "Ask someone or visit the official website.",
          description: "Always verify by asking first or by visiting the official site yourself.",
          isCorrect: true,
        },
        {
          text: "Forward the message.",
          description: "Forwarding only spreads the risk.",
        },
        {
          text: "Like the message.",
          description: "Liking won't help against phishing.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "What often happens if you click on a phishing link?",
      answers: [
        {
          text: "You are redirected to a fake website.",
          description: "You are taken to a fake page that can steal your data.",
          isCorrect: true,
        },
        {
          text: "You receive a gift.",
          description: "Phishing offers are never legitimate gifts.",
        },
        {
          text: "You are thrown off the internet.",
          description: "You're not actually thrown off the internet but your data could be stolen.",
        },
        {
          text: "You win a trip.",
          description: "Fake prizes like trips are often a phishing trick.",
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
      "Hey, you probably saw that embarrassing picture of me, too... could you please help me out?",
    notificationTitle: "Message from Max",
    overlayTitle: "Max needs you!",
    overlayPrompt: "Choose an action:",
    header: {
      avatarLabel: "S4",
      profileName: "CyberCareers",
      subtitle: "Sponsored • Scene 4",
    },
    feedActions: {
      like: "Like",
      chat: "Chat",
      share: "Share",
    },
    commentsLabel: "Comments",
    actions: [
      {
        id: "ignore",
        label: "Do nothing and ignore it",
        response: "Ignoring it won't make it go away. I feel alone with it.",
        isCorrect: false,
      },
      {
        id: "confront_publicly",
        label: "Publicly comment and tell the poster to delete it",
        response:
          "That might just draw more attention to it and the situation may escalate. I don’t want to make things worse.",
        isCorrect: false,
      },
      {
        id: "report_alone",
        label: "Report the photo to the app provider without telling Max",
        response:
          "Reporting is a good idea, but I wish you had talked to me first. It's important that you stand by me.",
        isCorrect: false,
      },
      {
        id: "support_and_act",
        label: "Ask Max how he feels and offer to help him report it",
        response:
          "Thank you for checking with me first. It means a lot to me. Let's report it together.",
        isCorrect: true,
      },
    ],
  },
  miniGame: {
    title: "To post or not to post?",
    description:
      "You’ve seen that not every picture belongs on the internet. In this game, you decide: Press the right button to post or the left button to not post.",
    allCorrect: "Great job! You did everything right!",
    minimumReached: "Very good! You answered most of them correctly!",
    insufficient: "Not bad, but there's still room for improvement!",
    post: "Post",
    notPost: "Don't post",
    couldPost: "You could post this image.",
    shouldNotPost: "You shouldn't post this image.",
  },
  quiz: [
    {
      question:
        "What's the first thing you should do if your friend Max posts a photo of you that you don't like on InstaVibe ?",
      answers: [
        {
          text: "Report the photo to InstaVibe immediately",
          description:
            "Reporting can help – but first try solving it directly with the person who posted it.",
        },
        {
          text: "Insult Max in the comments",
          description:
            "Insults only escalate the situation and won't make the photo get removed faster.",
        },
        {
          text: "Politely ask Max in a private message to delete the photo",
          description:
            "Correct: A calm, friendly private message is usually the quickest and most respectful solution.",
          isCorrect: true,
        },
        {
          text: "Do nothing – he's your friend",
          description:
            "If you feel uncomfortable, you have the right to speak up – friendships are based on respect.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You took a funny picture of Timo tripping. Can you post it on InstaVibe without his permission?",
      answers: [
        {
          text: "Yes, it's funny - that's all that matters!",
          description: "Being funny doesn't override someone's right to their own image.",
        },
        {
          text: "Only if you don't tag him",
          description: "Even without a tag, it's still his image – he must agree.",
        },
        {
          text: "No, everyone has the 'right to their own image'.",
          description:
            "Correct: You need permission before posting pictures of identifiable people.",
          isCorrect: true,
        },
        {
          text: "Yes, but only for close friends",
          description: "Privacy still applies in your private circle – ask first.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You asked Max to delete the photo of you but he doesn't respond. What's the next, most sensible step?",
      answers: [
        {
          text: "Hacking his password and delete it yourself",
          description: "Hacking is illegal and makes everything worse.",
        },
        {
          text: "Posting an embarrassing photo of him to get back at him",
          description: "Revenge creates more problems and also violates his rights.",
        },
        {
          text: "Reporting the photo to InstaVibe since it has been posted without your consent",
          description:
            "Correct: If direct contact fails, use the platform's reporting tools to protect yourself.",
          isCorrect: true,
        },
        {
          text: "Deleting your account",
          description:
            "Deleting your account doesn't solve the issue – use the available tools first.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Which of the following photos can be posted on InstaVibe without needing anyone's permission?",
      answers: [
        {
          text: "A group photo of your entire class",
          description: "Group photos involve multiple people – you need their consent first.",
        },
        {
          text: "A stranger wearing a cool shirt",
          description: "Strangers still have privacy and personality rights.",
        },
        {
          text: "A sunset by the lake",
          description:
            "Correct: Nature/landscape photos showing no identifiable people are perfectly fine.",
          isCorrect: true,
        },
        {
          text: "Your little brother playing",
          description: "Photos of children require extra caution and parental consent.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Someone uploaded a picture of you to a fake profile and is writing mean things. What should you do?",
      answers: [
        {
          text: "Write back to the profile and insult them back",
          description: "Insulting back can escalate the situation and be used against you.",
        },
        {
          text: "Report the profile immediately and talk to a parent or teacher",
          description: "Correct: Get support from trusted adults and use reporting tools.",
          isCorrect: true,
        },
        {
          text: "Do nothing – it will stop on its own.",
          description: "Problems like this often get worse if ignored.",
        },
        {
          text: "Ask your friends to insult the person, too",
          description:
            "Coordinated harassment can escalate the situation and violates platform rules.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You want to post a photo of your school report because you're proud. Why might that be a bad idea?",
      answers: [
        {
          text: "Others might get jealous of your grades.",
          description: "Jealousy isn't the main issue – exposure of personal data is.",
        },
        {
          text: "School reports are boring and probably won't get any likes.",
          description: "Likes don't matter – your privacy does.",
        },
        {
          text: "It shows private data like your full name, birth date and school name.",
          description: "Correct: Those details can be misused if shared publicly.",
          isCorrect: true,
        },
        {
          text: "The school strictly forbids it.",
          description:
            "Rules concerning this may exist, but protecting personal data is the key reason.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "The 'right to one's own image' means that…",
      answers: [
        {
          text: "… you are only allowed to post professional photos of yourself.",
          description: "No – it's about consent, not photo quality.",
        },
        {
          text: "… in general everyone has the right to decide whether images of them can be published.",
          description: "Correct: Publishing identifiable photos requires permission.",
          isCorrect: true,
        },
        {
          text: "… you can charge money for every photo you take.",
          description: "That has nothing to do with this right.",
        },
        {
          text: "… you have the right to draw any picture you want.",
          description:
            "Drawing is a different story – the right concerns publishing photos of people.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "At Lea's party, a photo was taken where someone's having an embarrassing moment in the background. Should you post it?",
      answers: [
        {
          text: "Yes, it's funny and everyone will laugh.",
          description: "Funny for you might be hurtful for them – respect comes first.",
        },
        {
          text: "No, it could embarrass and hurt the person in the background.",
          description: "Correct: Don't expose someone else's uncomfortable moment.",
          isCorrect: true,
        },
        {
          text: "Yes, but only if the person isn't clearly visible",
          description:
            "Even if the photo is blurred, people might still be identifiable or feel exposed.",
        },
        {
          text: "Maybe, but add a funny filter",
          description: "A filter doesn't solve the privacy issue.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You reported an image on InstaVibe but nothing happens. Who can you reach out to outside of the app?",
      answers: [
        {
          text: "No one – nothing else can be done.",
          description: "There are always people you can ask for help.",
        },
        {
          text: "Your followers, to pressure the person",
          description: "Mobilizing a mob can lead to more harm and rule violations.",
        },
        {
          text: "Your phone manufacturer",
          description: "They can't help with platform content issues.",
        },
        {
          text: "Parents, teachers or a counselling service",
          description:
            "Correct: Trusted adults or services can support you in initiating further steps.",
          isCorrect: true,
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Why is it a good idea to disable automatic location tagging (geotagging) before posting photos to InstaVibe?",
      answers: [
        {
          text: "Because it improves photo quality",
          description: "Image quality isn't affected by location tags.",
        },
        {
          text: "Because, otherwise, you'll get fewer likes",
          description: "Likes aren't connected to geotagging.",
        },
        {
          text: "Because strangers could figure out where you’re usually located",
          description: "Correct: Location patterns (home, school) can expose you to risks.",
          isCorrect: true,
        },
        {
          text: "Because it saves your phone battery",
          description: "Battery life isn't the main reason – privacy and safety are.",
        },
      ],
      timeLimit: 30,
    },
  ],
};

const password: PasswordTranslation = {
  prologue: {
    classroom:
      "<T>[Computer lab. You take your seat next to your classmates, curious about today's lesson. Mr. Müller looks like he has something interesting planned...]</T>",
  },
  intro: {
    herrMueller1:
      "<B>Mr. Müller:</B>\nAlright everyone, something different today! The school's rolling out a new email system. Each of you will get your own school email address.",
    herrMueller2:
      "(He types on his keyboard as the projector displays the system homepage. You lean forward, interested)",
    herrMueller3:
      "<B>Mr. Müller:</B>\nGo to mail.school-net.com and log in with your temporary password. First thing - you MUST create a strong, secure password. Remember what we've learned about online safety!",
    player1:
      "<B>[You navigate to the URL and see: 'Welcome to SchoolMail - Set New Password']</B>\nAfter everything I've learned about online safety, I need to make this password really secure...",
  },
  miniGame: {
    title: "Password Shredder",
    description: "Find out what makes a strong password and which ones are insecure.",
    hint: "But remember: A strong password alone is no guarantee that you are safe!",
    endScreenScore: "Your final score: ",
    tutorial: [
      {
        title: "Controls",
        message:
          "Direct the saw blade towards the passwords with your mouse, touch or keyboard and cut them (←/A left, →/D right).",
      },
      {
        title: "Passwords",
        message: "Direct the saw blade to the passwords and cut them - but only the weak ones!",
      },
      {
        title: "Points",
        message: "Don't cut strong passwords or you'll lose points!",
      },
    ],
  },
  quiz: [
    {
      question:
        "Mr. Müller asked you to create a new, secure password for your school email. What truly makes a password secure?",
      answers: [
        {
          text: "Your first name and year of birth",
          description:
            "A password consisting of your first name and year of birth is very easy to guess. Avoid personal information!",
        },
        {
          text: "At least 8 characters, upper and lower case letters, numbers, and special characters",
          description:
            "A secure password should be at least 8 characters long and contain a mix of upper and lower case letters, numbers, and special characters. This makes it harder to crack the password.",
          isCorrect: true,
        },
        {
          text: "‘123456’",
          description:
            "‘123456’ is one of the most common and weakest passwords. It can be hacked in seconds.",
        },
        {
          text: "The name of your pet",
          description:
            "The name of your pet is easy to guess, especially if someone knows you. Avoid simple names.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "You now have a secure password for your school email and for InstaVibe. How often should you change such important passwords?",
      answers: [
        {
          text: "Never",
          description:
            "If you never change your passwords, your account becomes an easy target in case of theft.",
        },
        {
          text: "Only when you have a new phone",
          description:
            "A new phone does not automatically mean you need to change your password - what matters is protection if there's a suspicion of data theft.",
        },
        {
          text: "Regularly and if you suspect misuse",
          description:
            "Regularly changing your passwords and immediately changing them if you suspect misues protects your accounts from attackers.",
          isCorrect: true,
        },
        {
          text: "Whenever you are in a bad mood",
          description: "Your mood has nothing to do with password security.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "What is a password manager?",
      answers: [
        {
          text: "A program that plays music",
          description: "Music programmes have nothing to do with passwords.",
        },
        {
          text: "A game for your phone",
          description: "A password manager is not a game, but a tool for your safety.",
        },
        {
          text: "A program that securely stores passwords",
          description:
            "A password manager helps you securely store all your passwords and remember them - you only need to remember one master password.",
          isCorrect: true,
        },
        {
          text: "A folder on the desk",
          description:
            "A folder on the desk would be insecure and lacks the protective functions of a real password manager.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Which of the following passwords is the most secure?",
      answers: [
        {
          text: "Football123",
          description:
            "It contains letters and numbers, but it's easy to guess, especially if someone knows you like football.",
        },
        {
          text: "H@u$M@u$2025!",
          description:
            "This password is long, creative, and contains upper and lower case letters, numbers, and special characters - exactly what makes it hard to crack.",
          isCorrect: true,
        },
        {
          text: "987654321",
          description:
            "This is a simple sequence of numbers and one of the most common passwords - very insecure.",
        },
        {
          text: "Hello",
          description: "A simple word without numbers or special characters is too easy to guess.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "How can you remember a secure password?",
      answers: [
        {
          text: "Not at all - you should use the same password for everything",
          description:
            "Using the same password for everything is very insecure and can easily lead to data theft.",
        },
        {
          text: "By forming a sentence and taking the first letter of each word",
          description:
            "A sentence helps you create a unique and secure password that you can easily remember, e.g. 'My dog loves 3 big bones!' → MdL3gB!",
          isCorrect: true,
        },
        {
          text: "By writing it down on a note and sticking it to the screen",
          description: "A password on a visible note is easy to steal.",
        },
        {
          text: "By using numbers only",
          description:
            "A secure password should contain numbers, letters, and special characters, not just numbers.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Why are special characters important in a password?",
      answers: [
        {
          text: "They make it easier to remember.",
          description:
            "Special characters often make passwords a bit more complicated, but not necessarily easier to remember.",
        },
        {
          text: "They increase security because there are more possibilities.",
          description:
            "Special characters ensure that there are many more combinations - this makes the password much harder to crack.",
          isCorrect: true,
        },
        {
          text: "They look nice.",
          description: "Appearance doesn't matter - security is crucial.",
        },
        {
          text: "They reduce the password length.",
          description:
            "Special characters do not shorten the password, they just make it stronger.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "Which of the following statements is correct?",
      answers: [
        {
          text: "A secure password should be as short as possible.",
          description:
            "Short passwords are much easier to guess or crack - the longer, the better!",
        },
        {
          text: "Passwords should be shared with friends.",
          description: "Passwords are private and should never be shared, not even with friends.",
        },
        {
          text: "A password should be as long and complex as possible.",
          description:
            "A long and complex password with letters, numbers, and special characters is much safer.",
          isCorrect: true,
        },
        {
          text: "A password doesn't need uppercase letters.",
          description:
            "Uppercase letters increase security because they create more possibilities in the password combination.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Imagine a classmate looks over your shoulder and now knows your school email password. What could they do with it?",
      answers: [
        {
          text: "They can pretend to be you and misuse your data.",
          description:
            "Whoever knows your password can take over your account, send messages, make purchases, or steal private data.",
          isCorrect: true,
        },
        {
          text: "They can bake you a cake.",
          description: "Your password has nothing to do with baking a cake.",
        },
        {
          text: "They can delete your password.",
          description:
            "Knowing the password alone is not enough to simply delete it - the damage occurs through access to your account.",
        },
        {
          text: "They can call your phone.",
          description: "Your password has no influence on phone calls.",
        },
      ],
      timeLimit: 30,
    },
    {
      question: "If you write down a password, where should you store it?",
      answers: [
        {
          text: "Right next to the computer",
          description:
            "A password left out in the open next to the computer can be easily found and stolen by others.",
        },
        {
          text: "In a public chat",
          description: "In a public chat, many people can read along - this is very unsafe.",
        },
        {
          text: "In a safe place that only you know",
          description:
            "If you write down your password, keept it in a secret, secure place that only you know, e.g., in a locked drawer or an encrypted document.",
          isCorrect: true,
        },
        {
          text: "Post it on social media",
          description: "Passwords should never be posted - that would be an invitation to hackers.",
        },
      ],
      timeLimit: 30,
    },
    {
      question:
        "Both your new school email account and InstaVibe offer two-factor authentication (2FA). What is the biggest advantage of using it?",
      answers: [
        {
          text: "You don't need a password anymore.",
          description: "You still need your password, but an additional confirmation is required.",
        },
        {
          text: "There is a second layer of security in addition to the password.",
          description:
            "With two-factor authentication, you are doubly protected, for example, by using a password and a code sent to your phone.",
          isCorrect: true,
        },
        {
          text: "It automatically extends the password.",
          description:
            "The length of the password stays the same - an additional verification step is simply added.",
        },
        {
          text: "You get a new password every day.",
          description:
            "Your password stays the same, but the confirmation code changes with each login.",
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
