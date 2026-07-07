export default function BulkModal({ v }) {
  return (
    <>
      <div style={{ font: "700 20px 'Space Grotesk'" }}>Bulk add cards</div>
      <div style={{ font: "400 13px/1.5 'Space Grotesk'", color: '#8A8375', marginTop: 8 }}>
        One card per line. Put <b>=</b> between question and answer:<br />France = Paris
      </div>
      <textarea
        value={v.bulk}
        onChange={(e) => v.bulkChange(e.target.value)}
        rows={10}
        placeholder={'France = Paris\nJapan = Tokyo\nEgypt = Cairo'}
        style={{ width: '100%', minHeight: 240, border: '1px solid rgba(0,0,0,.15)', borderRadius: 14, padding: 14, font: "500 15px/1.6 'Space Grotesk'", marginTop: 12, background: '#fff', outline: 'none', resize: 'vertical' }}
      />
      <button
        onClick={v.saveBulk}
        style={{ background: 'var(--accent,#D9552C)', color: '#fff', border: 'none', borderRadius: 14, padding: 16, font: "600 16px 'Space Grotesk'", width: '100%', marginTop: 14 }}
      >
        Add cards
      </button>
    </>
  );
}
