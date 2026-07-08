export default function DeckTitleModal({ v }) {
  return (
    <>
      <div style={{ font: "700 20px 'Space Grotesk'" }}>{v.deckModalTitle}</div>
      <input
        value={v.mTitle}
        onChange={(e) => v.mTitleChange(e.target.value)}
        placeholder="Deck title"
        style={{ width: '100%', border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 15, font: "500 16px 'Space Grotesk'", marginTop: 16, background: '#fff', outline: 'none' }}
      />
      <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8A8375', marginTop: 14 }}>Category / folder</div>
      <input
        value={v.mCat}
        onChange={(e) => v.mCatChange(e.target.value)}
        placeholder="e.g. Geography (optional)"
        list="deck-category-options"
        style={{ width: '100%', border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 15, font: "500 16px 'Space Grotesk'", marginTop: 8, background: '#fff', outline: 'none' }}
      />
      <datalist id="deck-category-options">
        {v.categories.map((c) => <option key={c} value={c} />)}
      </datalist>
      <div style={{ font: "400 12px/1.5 'Space Grotesk'", color: '#8A8375', marginTop: 8 }}>Decks with the same category are grouped together on the dashboard.</div>
      <button
        onClick={v.saveDeckModal}
        style={{ background: 'var(--accent,#D9552C)', color: '#fff', border: 'none', borderRadius: 14, padding: 16, font: "600 16px 'Space Grotesk'", width: '100%', marginTop: 14 }}
      >
        Save
      </button>
    </>
  );
}
