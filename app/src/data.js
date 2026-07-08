export const STORAGE_KEY = 'fcRecall_v1';
export const ACCENT = '#D9552C';
export const HIDDEN_DEFAULT = false;

export const LANGS = [
  ['en-US', 'English'],
  ['hi-IN', 'Hindi'],
  ['te-IN', 'Telugu'],
  ['kn-IN', 'Kannada'],
  ['ml-IN', 'Malayalam'],
  ['ta-IN', 'Tamil'],
  ['ur-PK', 'Urdu'],
  ['fa-IR', 'Persian'],
  ['ar-SA', 'Arabic'],
];

export function langName(code) {
  const m = LANGS.find((l) => l[0] === code);
  return m ? m[1] : code;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function mkCard(q, a) {
  return { id: uid(), q, a, streak: 0, seen: 0, right: 0 };
}

export function isMastered(c) {
  return c.streak >= 2;
}

export function fmtTime(ms) {
  const m = Math.round(ms / 60000);
  if (m < 1) return '<1m';
  if (m < 60) return m + 'm';
  return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
}

export function seedData() {
  return {
    onboarded: false,
    settings: { qLang: 'en-US', aLang: 'en-US', hiddenOptions: HIDDEN_DEFAULT, autoRead: false },
    stats: { streak: 0, lastDay: '', timeMs: 0, answered: 0, correct: 0 },
    decks: [
      {
        id: uid(),
        title: 'World Capitals',
        category: 'Geography',
        remainingOnly: false,
        cards: [
          mkCard('Capital of France?', 'Paris'),
          mkCard('Capital of Japan?', 'Tokyo'),
          mkCard('Capital of Egypt?', 'Cairo'),
          mkCard('Capital of Brazil?', 'Brasília'),
          mkCard('Capital of Canada?', 'Ottawa'),
          mkCard('Capital of Australia?', 'Canberra'),
          mkCard('Capital of Kenya?', 'Nairobi'),
          mkCard('Capital of Norway?', 'Oslo'),
        ],
      },
      {
        id: uid(),
        title: 'Hindi Basics',
        category: 'Languages',
        remainingOnly: false,
        cards: [
          mkCard('Water', 'पानी (Paani)'),
          mkCard('Book', 'किताब (Kitaab)'),
          mkCard('Friend', 'दोस्त (Dost)'),
          mkCard('Food', 'खाना (Khaana)'),
          mkCard('House', 'घर (Ghar)'),
          mkCard('Love', 'प्यार (Pyaar)'),
        ],
      },
    ],
  };
}

// Fill in fields added after v1 so data saved by older versions keeps working.
function normalize(d) {
  if (typeof d.settings.autoRead !== 'boolean') d.settings.autoRead = false;
  for (const dk of d.decks) {
    if (typeof dk.category !== 'string') dk.category = '';
    if (typeof dk.remainingOnly !== 'boolean') dk.remainingOnly = false;
  }
  return d;
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      if (d && d.decks && d.settings) return normalize(d);
    }
  } catch (e) {}
  return seedData();
}

const SAMPLE_TEXT = {
  'en-US': 'This is a voice test.',
  'hi-IN': 'यह एक आवाज़ जाँच है।',
  'te-IN': 'ఇది ఒక వాయిస్ పరీక్ష.',
  'kn-IN': 'ಇದು ಧ್ವನಿ ಪರೀಕ್ಷೆ.',
  'ml-IN': 'ഇതൊരു ശബ്ദ പരിശോധനയാണ്.',
  'ta-IN': 'இது ஒரு குரல் சோதனை.',
  'ur-PK': 'یہ ایک آواز کی جانچ ہے۔',
  'fa-IR': 'این یک آزمایش صدا است.',
  'ar-SA': 'هذا اختبار صوتي.',
};

export function sampleText(code) {
  return SAMPLE_TEXT[code] || SAMPLE_TEXT['en-US'];
}
