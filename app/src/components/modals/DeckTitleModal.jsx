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
      <button
        onClick={v.saveDeckModal}
        style={{ background: 'var(--accent,#D9552C)', color: '#fff', border: 'none', borderRadius: 14, padding: 16, font: "600 16px 'Space Grotesk'", width: '100%', marginTop: 14 }}
      >
        Save
      </button>
    </>
  );
}
