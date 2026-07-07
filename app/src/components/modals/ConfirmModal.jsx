export default function ConfirmModal({ v }) {
  return (
    <>
      <div style={{ font: "700 19px/1.3 'Space Grotesk'" }}>{v.confirmMsg}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
        <button onClick={v.closeModal} style={{ border: '1px solid rgba(0,0,0,.12)', background: '#fff', borderRadius: 14, padding: 15, font: "600 15px 'Space Grotesk'" }}>Cancel</button>
        <button onClick={v.confirmYes} style={{ border: 'none', background: '#C13B2A', color: '#fff', borderRadius: 14, padding: 15, font: "600 15px 'Space Grotesk'" }}>Delete</button>
      </div>
    </>
  );
}
