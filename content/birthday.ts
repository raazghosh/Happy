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
    salutation: "Happy Birthday, my dearest Jaan! 🎂😚🩵❤️",
    paragraphs: [
      "My Gungun, my love, my queen, my everything! 🥹🎀❤️ I feel so lucky to have you in my life. You are the most beautiful surprise life has ever given me, and I’m so happy that you were born on this day. 🫂💗",
      "Jaan, I wish you endless happiness, good health, success in everything you do, and the courage to achieve every dream in your heart. May you always keep smiling, keep growing, and keep shining brighter every day. You deserve all the beautiful things this world has to offer. 🥹✨❤️",
      "No matter how much I write, it will never be enough to explain how special you are to me. I just want to see you happy, achieve everything you dream of, and make countless beautiful memories together. Here’s to your beautiful life, your dreams, and many more birthdays together! 🧿🩵🫶🏻",
      "**Happy Birthday once again, Jaan! I love you endlessly, my Gungun. You are, and will always be, one of the most precious parts of my life.** 😚🎂🩵❤️",
    ],
    closing: "With all my love,",
    signature: "Your person, forever yours. ❤️🫂",
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
