const steps = [
  { n: 1, text: "We've set up two sample decks so you can try things right away. Everything is saved on your device." },
  { n: 2, text: 'Practice turns your cards into 4-choice quizzes. Answer, skip, or go back to review — a deck needs at least 4 cards.' },
  { n: 3, text: 'Tap the speaker icons to hear questions and answers aloud — pick languages in Settings (9 supported, incl. Hindi, Tamil & Arabic).' },
];

export default function Onboarding({ v }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(28,26,22,.55)', backdropFilter: 'blur(3px)', zIndex: 70, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', animation: 'fcFade .3s ease' }}
    >
      <div style={{ width: '100%', maxWidth: 430, background: '#F6F2E9', borderRadius: '24px 24px 0 0', padding: '28px 24px 34px', animation: 'fcSheet .35s ease' }}>
        <div style={{ font: "700 24px/1.2 'Space Grotesk'" }}>Welcome to Recall 👋</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: 9, background: 'var(--accent,#D9552C)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 13px 'Space Grotesk'", flex: 'none' }}>{s.n}</div>
              <div style={{ font: "400 14px/1.5 'Space Grotesk'" }}>{s.text}</div>
            </div>
          ))}
        </div>
        <button
          onClick={v.finishOnboarding}
          style={{ background: '#1C1A16', color: '#F6F2E9', border: 'none', borderRadius: 16, padding: 17, font: "600 16px 'Space Grotesk'", width: '100%', marginTop: 24 }}
        >
          Start learning
        </button>
      </div>
    </div>
  );
}
