// ============================================================
// BIRTHDAY WEBSITE CONFIGURATION
// Edit this file to personalise the entire website.
// No component logic changes required.
// ============================================================

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  date?: string;
  width: number;
  height: number;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface LoveReason {
  id: string;
  front: string;
  back: string;
}

export interface ThemeSettings {
  burgundy: string;
  rose: string;
  blush: string;
  cream: string;
  gold: string;
  text: string;
}

export interface BirthdayConfig {
  recipient: { name: string; nickname: string };
  sender: { name: string };
  birthday: { date: string; timezone: string };
  hero: { tagline: string; ctaLabel: string; heroImage: string; heroImageAlt: string };
  surprise: { revealMessage: string; subMessage: string };
  gallery: GalleryImage[];
  timeline: TimelineEntry[];
  loveReasons: LoveReason[];
  letter: { salutation: string; paragraphs: string[]; closing: string; signature: string };
  music: { src: string; title: string; artist?: string } | null;
  finalMessage: { wish: string; message: string; photo: string; photoAlt: string };
  theme: ThemeSettings;
}

const config: BirthdayConfig = {
  recipient: { name: "Shiuri", nickname: "Jaan" },
  sender: { name: "Your Person ♥" },
  birthday: { date: "2026-10-15", timezone: "Asia/Kolkata" },
  hero: {
    tagline: "Today the world became a better place — the day you were born.",
    ctaLabel: "Open your little surprise ✨",
    heroImage: "/uploads/hero.jpg",
    heroImageAlt: "A photo of Shiuri & me",
  },
  surprise: {
    revealMessage: "Happy Birthday, Jaan! 🎂",
    subMessage: "I made this just for you, Shiuri. Scroll down and explore every little piece of it.",
  },
  gallery: [
    { src: "/uploads/photo-1.jpg", alt: "Festive celebration in traditional saree and kurta", caption: "Festive celebrations together in our traditional best", date: "Puja Celebrations", width: 667, height: 1024 },
    { src: "/uploads/photo-2.jpg", alt: "Beautiful smile with a flower in her hair", caption: "That sweet flower in your hair and the smile that stole my heart", date: "Special Day", width: 1024, height: 768 },
    { src: "/uploads/photo-3.jpg", alt: "Smiling together in hallway in yellow kurta and saree", caption: "Leaning on you — my favourite place in the whole world", date: "Pure Joy", width: 782, height: 1024 },
    { src: "/uploads/photo-4.jpg", alt: "Sunny outdoor ride together", caption: "Every ride and open road is an adventure with you", date: "Sunny Days", width: 582, height: 1024 },
    { src: "/uploads/photo-5.jpg", alt: "Radiant selfie with big smiles", caption: "Your laugh and that radiant smile brighten up everything", date: "Happy Moments", width: 1024, height: 759 },
  ],
  timeline: [
    { id: "t1", date: "The beginning", title: "The day everything changed", description: "I still remember exactly what I was thinking the moment I first saw you. I did not know it then, but my life was quietly rearranging itself." },
    { id: "t2", date: "A little later", title: "Our first real conversation", description: "We talked for what felt like minutes and turned out to be hours. I did not want it to end." },
    { id: "t3", date: "Somewhere in between", title: "When I knew", description: "There was one ordinary evening when I looked at you and understood, with complete certainty, that I wanted many more ordinary evenings with you." },
    { id: "t4", date: "And now", title: "Here we are", description: "Every good thing in my recent memory has you in it. I am so grateful you exist." },
  ],
  loveReasons: [
    { id: "r1", front: "The way you laugh", back: "Your laugh starts somewhere deep and real. It is completely contagious and it is the thing I most want to hear every single day." },
    { id: "r2", front: "How you love people", back: "You give your care so generously — to friends, to strangers, to animals, to me. Watching you love people is one of my favourite things." },
    { id: "r3", front: "Your honesty", back: "You say the true thing even when it is uncomfortable. That takes quiet courage, and I trust you completely because of it." },
    { id: "r4", front: "How curious you are", back: "You want to understand things deeply. You ask real questions. Conversations with you never feel hollow." },
    { id: "r5", front: "The way you see beauty", back: "You notice the small things — light through a window, a strange cloud, an ordinary street that somehow looks perfect in that moment." },
    { id: "r6", front: "Your warmth", back: "You make people feel genuinely welcome. Everyone who knows you feels a little better for it." },
    { id: "r7", front: "How hard you try", back: "Even when things are difficult, you keep going. You do not broadcast it — you just quietly, steadily persist. I find that incredibly beautiful." },
    { id: "r8", front: "That you exist at all", back: "Out of all possible worlds, you are in this one. That still feels like the luckiest thing that has ever happened to me." },
  ],
  letter: {
    salutation: "To My Dearest Jaan, My Gungun 🥹🎀🩵",
    paragraphs: [
      "Happy Birthday, my baby! 🎂😚❤️",
      "Jaan, honestly, ami jani na kotha theke start korbo, because tomake niye amar moner moddhe eto kichu ache je majhe majhe mone hoy, words diye ki ar sob feelings bojhano jay? 🥹❤️ But today is your day, and I want to tell you some of the things that maybe I don't say enough.",
      "Do you know what makes me happiest? It's the fact that you were born. 🥺🩵 Out of all the people in this world, life somehow brought you into mine. And the most beautiful part is, I never planned any of this. Tumi amar life-e eshechile just a normal friend hoye, ar dekhte dekhte kokhon je amar favourite person, amar jaan, amar Gungun, amar sobkichu hoye gele, ami nijeo bujhte parini. 🫂💗",
      "Sometimes I look at our old photos and smile like an idiot. 😭❤️ Amader ei 4 bochore koto memories hoye geche, tai na? Koto dates, koto bike rides, koto ghora, koto hashi, koto paglamo, ar koto chhoto chhoto moments! 🥰📸 Maybe tokhon bujhini je ei ordinary moments-guloi ekdin amar eto precious hoye jabe. And now, whenever I look at them, all I can think about is how many more beautiful memories we still have waiting for us. 🥹🩵",
      "Jaan, you have become such a special part of my everyday life. Tomar songe kotha bola, tomar paglamo shona, tomar chhoto chhoto reactions dekha, tomake tease kora, tomar songe hasha—these little things make me happier than you probably realise. 😚❤️ Sometimes even an ordinary day feels better just because I got to talk to you. And sometimes, even when I don't know how to explain what I'm feeling, just having you in my life feels comforting. 🤗🫶🏻",
      "And my Gungun, I love all the little things about you. Your cute side, your stubborn side, your funny side, your caring side, and even those moments when you become a little difficult to handle. 😂🥹❤️ You don't have to be perfect for me to love you. You can be happy, moody, silly, quiet, or completely pagal, and you'll still be my favourite girl. 🎀🩵",
      "And today, on October 15th, I just want to say that I am SO happy you were born, baby. 🥹🎂❤️",
      "I wish I could give you a little glimpse of what you mean to me, because sometimes I genuinely feel that even my longest messages can't explain it properly. I wish you could see yourself through my eyes for just a minute. Maybe then you'd understand why your smile makes me smile, why your happiness matters so much to me, and why your birthday makes me this excited. 😭💗",
      "It's your birthday, but somehow, my heart is celebrating too. Because today is the day my favourite person came into this world. The little girl who grew up to become my Gungun, my jaan, my love. 🥹🩵 And I feel so lucky that somewhere along the way, our lives crossed and we found each other.",
      "On your birthday, I wish you all the happiness in the world. I hope you achieve everything you dream of, become everything you want to be, and always have reasons to smile. I hope life is gentle with your heart, that you never stop believing in yourself, and that you always remember how precious you are. ❤️🫂",
      "And haan, madam, I also wish that you keep smiling, keep being your cute little self, keep doing your paglamo, and keep making my life a little more beautiful just by being in it. 😂😚🩵",
      "We have already spent four beautiful years together, but baby, I hope this is just the beginning. I want more birthdays with you, more dates, more bike rides, more trips, more random photographs, more silly arguments, more making up, more laughter, and thousands of little memories that we'll look back on someday and smile about. 🥹❤️",
      "I can't predict what every day of our future will look like, but I know that the thought of creating more memories with you makes me genuinely happy. And I hope that, as we grow older, we keep finding new reasons to love, understand, and appreciate each other. 🫶🏻💗",
    ],
    closing: "So, happy birthday once again, my dearest Jaan,",
    signature: "Your Person Forever ♥",
  },
  music: {
    src: "/audio/tu-chahiye.mp3",
    title: "Tu Chahiye",
    artist: "Atif Aslam, Pritam & Amitabh Bhattacharya (2015)",
  },
  finalMessage: {
    wish: "Happy Birthday, Jaan! 🎂",
    message: "May this year bring you everything you have quietly hoped for and a few beautiful surprises you did not expect. You deserve every good thing, Shiuri.",
    photo: "/uploads/hero.jpg",
    photoAlt: "A photo of Shiuri & me",
  },
  theme: {
    burgundy: "#581C32",
    rose: "#D96C91",
    blush: "#F8E7EC",
    cream: "#FFF8F0",
    gold: "#D6B779",
    text: "#30232A",
  },
};

export default config;
