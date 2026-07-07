export default function CardModal({ v }) {
  return (
    <>
      <div style={{ font: "700 20px 'Space Grotesk'" }}>{v.cardModalTitle}</div>
      <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8A8375', marginTop: 16 }}>Question</div>
      <textarea
        value={v.mQ}
        onChange={(e) => v.mQChange(e.target.value)}
        rows={2}
        placeholder="e.g. Capital of France?"
        style={{ width: '100%', border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 14, font: "500 15px/1.4 'Space Grotesk'", marginTop: 8, background: '#fff', outline: 'none', resize: 'vertical' }}
      />
      <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.08em', textTransform: 'uppercase', color: '#8A8375', marginTop: 14 }}>Answer</div>
      <textarea
        value={v.mA}
        onChange={(e) => v.mAChange(e.target.value)}
        rows={2}
        placeholder="e.g. Paris"
        style={{ width: '100%', border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 14, font: "500 15px/1.4 'Space Grotesk'", marginTop: 8, background: '#fff', outline: 'none', resize: 'vertical' }}
      />
      <button
        onClick={v.saveCard}
        style={{ background: 'var(--accent,#D9552C)', color: '#fff', border: 'none', borderRadius: 14, padding: 16, font: "600 16px 'Space Grotesk'", width: '100%', marginTop: 16 }}
      >
        Save card
      </button>
      {v.isEditingCard && (
        <button
          onClick={v.delCardFromModal}
          style={{ border: 'none', background: 'transparent', font: "600 14px 'Space Grotesk'", color: '#C13B2A', width: '100%', padding: 14, marginTop: 4 }}
        >
          Delete card
        </button>
      )}
    </>
  );
}
