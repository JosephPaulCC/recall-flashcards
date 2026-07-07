import { SpeakerIcon } from '../../icons';

export default function VoiceModal({ v }) {
  return (
    <>
      <div style={{ font: "700 20px 'Space Grotesk'" }}>Voice languages</div>
      <div style={{ font: "400 13px/1.5 'Space Grotesk'", color: '#8A8375', marginTop: 6 }}>
        Pick a voice for questions and one for answers. Changes apply instantly — even mid-session.
      </div>
      <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8A8375', marginTop: 18 }}>Question voice</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <select
          value={v.qLang}
          onChange={(e) => v.setQLang(e.target.value)}
          style={{ flex: 1, minWidth: 0, border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 14, font: "500 15px 'Space Grotesk'", background: '#fff', outline: 'none', WebkitAppearance: 'none' }}
        >
          {v.langs.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
        <button
          onClick={v.testQ}
          aria-label="Test question voice"
          style={{ width: 54, flex: 'none', border: '1px solid rgba(0,0,0,.15)', background: '#fff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C1A16' }}
        >
          <SpeakerIcon width={18} height={18} />
        </button>
      </div>
      <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8A8375', marginTop: 14 }}>Answer voice</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <select
          value={v.aLang}
          onChange={(e) => v.setALang(e.target.value)}
          style={{ flex: 1, minWidth: 0, border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 14, font: "500 15px 'Space Grotesk'", background: '#fff', outline: 'none', WebkitAppearance: 'none' }}
        >
          {v.langs.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
        <button
          onClick={v.testA}
          aria-label="Test answer voice"
          style={{ width: 54, flex: 'none', border: '1px solid rgba(0,0,0,.15)', background: '#fff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C1A16' }}
        >
          <SpeakerIcon width={18} height={18} />
        </button>
      </div>
      <div style={{ font: "400 12px/1.5 'Space Grotesk'", color: '#8A8375', marginTop: 12 }}>
        Tap ▶ to test a voice. Indian &amp; other non-English voices only play if your device has that language pack installed — otherwise the app tells you and falls back to the default voice.
      </div>
      {v.noTTS && (
        <div style={{ background: '#FBF0DC', border: '1px solid #E4C88A', borderRadius: 12, padding: 12, marginTop: 14, font: "500 12px/1.5 'Space Grotesk'", color: '#7A5B1E' }}>
          ⚠ Text-to-speech isn't supported in this browser. Speaker buttons will be silent.
        </div>
      )}
      <button
        onClick={v.closeModal}
        style={{ border: 'none', background: 'var(--accent,#D9552C)', color: '#fff', borderRadius: 14, padding: 15, font: "600 15px 'Space Grotesk'", width: '100%', marginTop: 18 }}
      >
        Done
      </button>
    </>
  );
}
