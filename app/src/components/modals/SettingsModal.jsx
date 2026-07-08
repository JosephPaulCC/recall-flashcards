export default function SettingsModal({ v }) {
  return (
    <>
      <div style={{ font: "700 20px 'Space Grotesk'" }}>Settings</div>
      <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8A8375', marginTop: 18 }}>Question voice language</div>
      <select
        value={v.qLang}
        onChange={(e) => v.setQLang(e.target.value)}
        style={{ width: '100%', border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 14, font: "500 15px 'Space Grotesk'", marginTop: 8, background: '#fff', outline: 'none', WebkitAppearance: 'none' }}
      >
        {v.langs.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
      </select>
      <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8A8375', marginTop: 14 }}>Answer voice language</div>
      <select
        value={v.aLang}
        onChange={(e) => v.setALang(e.target.value)}
        style={{ width: '100%', border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 14, font: "500 15px 'Space Grotesk'", marginTop: 8, background: '#fff', outline: 'none', WebkitAppearance: 'none' }}
      >
        {v.langs.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
      </select>
      <div
        onClick={v.toggleHidden}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid rgba(0,0,0,.1)', borderRadius: 14, padding: 14, marginTop: 16, cursor: 'pointer' }}
      >
        <div>
          <div style={{ font: "600 15px 'Space Grotesk'" }}>Hidden options mode</div>
          <div style={{ font: "400 12px/1.4 'Space Grotesk'", color: '#8A8375', marginTop: 2 }}>Hide choices until you tap to reveal</div>
        </div>
        <div style={{ width: 48, height: 28, borderRadius: 99, background: v.hiddenToggleBg, position: 'relative', transition: 'background .2s', flex: 'none' }}>
          <div style={{ position: 'absolute', top: 3, left: v.hiddenKnobLeft, width: 22, height: 22, borderRadius: 99, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.3)', transition: 'left .2s' }} />
        </div>
      </div>
      <div
        onClick={v.toggleAutoRead}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid rgba(0,0,0,.1)', borderRadius: 14, padding: 14, marginTop: 10, cursor: 'pointer' }}
      >
        <div>
          <div style={{ font: "600 15px 'Space Grotesk'" }}>Auto read aloud</div>
          <div style={{ font: "400 12px/1.4 'Space Grotesk'", color: '#8A8375', marginTop: 2 }}>Speak each question, and the answer when you pick correctly</div>
        </div>
        <div style={{ width: 48, height: 28, borderRadius: 99, background: v.autoToggleBg, position: 'relative', transition: 'background .2s', flex: 'none' }}>
          <div style={{ position: 'absolute', top: 3, left: v.autoKnobLeft, width: 22, height: 22, borderRadius: 99, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.3)', transition: 'left .2s' }} />
        </div>
      </div>
      {v.noTTS && (
        <div style={{ background: '#FBF0DC', border: '1px solid #E4C88A', borderRadius: 12, padding: 12, marginTop: 14, font: "500 12px/1.5 'Space Grotesk'", color: '#7A5B1E' }}>
          ⚠ Text-to-speech isn't supported in this browser. Speaker buttons will be silent.
        </div>
      )}
      <button
        onClick={v.closeModal}
        style={{ border: '1px solid rgba(0,0,0,.12)', background: '#fff', borderRadius: 14, padding: 15, font: "600 15px 'Space Grotesk'", width: '100%', marginTop: 18 }}
      >
        Done
      </button>
    </>
  );
}
