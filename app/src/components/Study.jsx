import { GlobeIcon, EditIcon, SpeakerIcon, EyeOffIcon, StrikeEyeIcon } from '../icons';

export default function Study({ v }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '18px 18px 20px', animation: 'fcPop .25s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0, font: "600 14px/1.2 'Space Grotesk'", color: '#8A8375', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.deckTitle}</div>
        <button
          onClick={v.openVoice}
          aria-label="Voice languages"
          style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid rgba(0,0,0,.1)', background: '#fff', color: '#1C1A16', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <GlobeIcon />
        </button>
        <button
          onClick={v.addCardOpen}
          aria-label="Add card"
          style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid rgba(0,0,0,.1)', background: '#fff', font: "600 20px 'Space Grotesk'", color: '#1C1A16', flex: 'none' }}
        >
          +
        </button>
        <button
          onClick={v.endSession}
          style={{ border: '1px solid rgba(0,0,0,.12)', background: '#1C1A16', color: '#F6F2E9', borderRadius: 12, padding: '10px 14px', font: "600 13px 'Space Grotesk'", flex: 'none', whiteSpace: 'nowrap' }}
        >
          End
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
        <div style={{ flex: 1, height: 6, background: 'rgba(0,0,0,.08)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--accent,#D9552C)', borderRadius: 99, width: v.progressW, transition: 'width .3s ease' }} />
        </div>
        <div style={{ font: "600 13px 'Space Grotesk'", color: '#8A8375', flex: 'none' }}>{v.turnNum} / {v.turnTotal}</div>
        <button
          onClick={v.toggleHidden}
          style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid rgba(0,0,0,.12)', background: v.hiddenChipBg, color: v.hiddenChipFg, borderRadius: 99, padding: '7px 11px', font: "600 11px 'Space Grotesk'", flex: 'none', whiteSpace: 'nowrap' }}
        >
          <EyeOffIcon />
          Hidden options
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 20, padding: 20, marginTop: 16, boxShadow: '0 2px 10px rgba(28,26,22,.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ font: "600 11px 'Space Grotesk'", letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A8375', flex: 1 }}>{v.turnBadge}</span>
          <button onClick={v.editTurnCard} aria-label="Edit this card" style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid rgba(0,0,0,.1)', background: '#F6F2E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <EditIcon />
          </button>
          <button onClick={v.speakQ} aria-label="Speak question" style={{ width: 38, height: 38, borderRadius: 11, border: '1px solid rgba(0,0,0,.1)', background: '#F6F2E9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C1A16' }}>
            <SpeakerIcon />
          </button>
        </div>
        <div style={{ font: "600 24px/1.35 'Space Grotesk'", marginTop: 12 }}>{v.turnQ}</div>
      </div>

      {v.covered && (
        <div
          onClick={v.reveal}
          style={{ flex: 1, minHeight: 240, marginTop: 14, border: '2px dashed rgba(0,0,0,.18)', borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#8A8375', cursor: 'pointer' }}
        >
          <StrikeEyeIcon />
          <div style={{ font: "600 15px 'Space Grotesk'" }}>Tap to reveal options</div>
        </div>
      )}

      {v.showOptions && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14, animation: 'fcFade .2s ease' }}>
          {v.options.map((opt, i) => (
            <div
              key={i}
              onClick={opt.pick}
              role="button"
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: opt.bg, border: `2px solid ${opt.border}`, borderRadius: 16, padding: '14px 14px', minHeight: 60, cursor: 'pointer', opacity: opt.opacity }}
            >
              <div style={{ width: 30, height: 30, borderRadius: 9, background: opt.chipBg, color: opt.chipFg, display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 13px 'Space Grotesk'", flex: 'none' }}>{opt.letter}</div>
              <div style={{ flex: 1, font: "500 17px/1.35 'Space Grotesk'", color: opt.fg }}>{opt.text}</div>
              <button
                onClick={(e) => { e.stopPropagation(); opt.speak(); }}
                aria-label="Speak option"
                style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(0,0,0,.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: opt.fg, flex: 'none' }}
              >
                <SpeakerIcon color={opt.fg} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        <button onClick={v.goBack} style={{ flex: 1, border: '1px solid rgba(0,0,0,.12)', background: '#fff', borderRadius: 14, padding: 15, font: "600 15px 'Space Grotesk'", color: v.backFg, opacity: v.backOpacity }}>← Back</button>
        {v.showSkip && (
          <button onClick={v.skip} style={{ flex: 1, border: '1px solid rgba(0,0,0,.12)', background: '#fff', borderRadius: 14, padding: 15, font: "600 15px 'Space Grotesk'", color: '#1C1A16' }}>Skip →</button>
        )}
        {v.showNext && (
          <button onClick={v.next} style={{ flex: 1.4, border: 'none', background: 'var(--accent,#D9552C)', color: '#fff', borderRadius: 14, padding: 15, font: "600 15px 'Space Grotesk'" }}>{v.nextLabel}</button>
        )}
      </div>
    </div>
  );
}
