import { BackIcon, EditIcon, TrashIcon, PlayIcon } from '../icons';

export default function DeckView({ v }) {
  return (
    <div style={{ flex: 1, padding: '18px 18px 40px', animation: 'fcPop .25s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={v.toDash}
          aria-label="Back"
          style={{ width: 44, height: 44, borderRadius: 14, border: '1px solid rgba(0,0,0,.1)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}
        >
          <BackIcon />
        </button>
        <div style={{ flex: 1, minWidth: 0, font: "700 20px/1.2 'Space Grotesk'", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.deckTitle}</div>
        <button
          onClick={v.editDeckOpen}
          aria-label="Rename deck"
          style={{ width: 44, height: 44, borderRadius: 14, border: '1px solid rgba(0,0,0,.1)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}
        >
          <EditIcon />
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 18, padding: 16, marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ font: "600 13px 'Space Grotesk'", color: '#8A8375' }}>Deck progress</div>
          <div style={{ font: "700 16px 'Space Grotesk'", color: 'var(--accent,#D9552C)' }}>{v.deckPct}%</div>
        </div>
        <div style={{ height: 8, background: 'rgba(0,0,0,.07)', borderRadius: 99, marginTop: 10, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--accent,#D9552C)', borderRadius: 99, width: v.deckPctW }} />
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 10, font: "500 13px 'Space Grotesk'", color: '#8A8375' }}>
          <span style={{ color: '#2E7D4F' }}>● {v.deckMastered} mastered</span>
          <span>● {v.deckRemaining} remaining</span>
        </div>
      </div>

      {v.needMore && (
        <div style={{ background: '#FBF0DC', border: '1px solid #E4C88A', borderRadius: 14, padding: '12px 14px', marginTop: 12, font: "500 13px/1.5 'Space Grotesk'", color: '#7A5B1E' }}>
          ⚠ A deck needs at least 4 cards to practice. Add {v.cardsNeeded} more.
        </div>
      )}

      <button
        onClick={v.practice}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: v.practiceBg, color: '#fff', border: 'none', borderRadius: 16, padding: 17, font: "600 17px 'Space Grotesk'", width: '100%', marginTop: 14 }}
      >
        <PlayIcon />
        Practice this deck
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
        <button onClick={v.addCardOpen} style={{ border: '1px solid rgba(0,0,0,.12)', background: '#fff', borderRadius: 14, padding: 14, font: "600 14px 'Space Grotesk'", color: '#1C1A16' }}>+ Add card</button>
        <button onClick={v.bulkOpen} style={{ border: '1px solid rgba(0,0,0,.12)', background: '#fff', borderRadius: 14, padding: 14, font: "600 14px 'Space Grotesk'", color: '#1C1A16' }}>⇪ Bulk add</button>
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A8375' }}>Cards · {v.deckCardCount}</div>
        {v.deckEmpty && (
          <div style={{ border: '2px dashed rgba(0,0,0,.15)', borderRadius: 16, padding: '30px 20px', textAlign: 'center', font: "500 14px/1.5 'Space Grotesk'", color: '#8A8375' }}>
            No cards yet. Add cards one by one, or paste many at once with Bulk add.
          </div>
        )}
        {v.deckCards.map((c) => (
          <div key={c.id} style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "600 15px/1.35 'Space Grotesk'" }}>{c.q}</div>
              <div style={{ font: "400 13px/1.4 'Space Grotesk'", color: '#8A8375', marginTop: 4 }}>{c.a}</div>
              {c.mastered && (
                <div style={{ display: 'inline-block', font: "600 10px 'Space Grotesk'", letterSpacing: '.08em', textTransform: 'uppercase', color: '#2E7D4F', background: '#E7F3EB', borderRadius: 99, padding: '3px 8px', marginTop: 8 }}>
                  Mastered
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 6, flex: 'none' }}>
              <button onClick={c.edit} aria-label="Edit card" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(0,0,0,.1)', background: '#F6F2E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EditIcon width={15} height={15} />
              </button>
              <button onClick={c.del} aria-label="Delete card" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(0,0,0,.1)', background: '#F6F2E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={v.delDeckAsk} style={{ border: 'none', background: 'transparent', font: "600 14px 'Space Grotesk'", color: '#C13B2A', marginTop: 22, width: '100%', padding: 12 }}>
        Delete this deck
      </button>
    </div>
  );
}
