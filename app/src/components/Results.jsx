export default function Results({ v }) {
  return (
    <div style={{ flex: 1, padding: '22px 18px 40px', animation: 'fcPop .25s ease' }}>
      <div style={{ textAlign: 'center', padding: '10px 0 0' }}>
        <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A8375' }}>Session complete</div>
        <div style={{ font: "700 56px/1 'Space Grotesk'", marginTop: 12 }}>{v.resScore}</div>
        <div style={{ font: "500 15px 'Space Grotesk'", color: '#8A8375', marginTop: 6 }}>{v.resAccuracy} accuracy · {v.resTime}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 20 }}>
        <div style={{ background: '#E7F3EB', borderRadius: 14, padding: 12, textAlign: 'center' }}>
          <div style={{ font: "700 20px 'Space Grotesk'", color: '#2E7D4F' }}>{v.resCorrect}</div>
          <div style={{ font: "500 11px 'Space Grotesk'", color: '#2E7D4F' }}>correct</div>
        </div>
        <div style={{ background: '#FBEAE6', borderRadius: 14, padding: 12, textAlign: 'center' }}>
          <div style={{ font: "700 20px 'Space Grotesk'", color: '#C13B2A' }}>{v.resWrong}</div>
          <div style={{ font: "500 11px 'Space Grotesk'", color: '#C13B2A' }}>wrong</div>
        </div>
        <div style={{ background: 'rgba(0,0,0,.06)', borderRadius: 14, padding: 12, textAlign: 'center' }}>
          <div style={{ font: "700 20px 'Space Grotesk'", color: '#8A8375' }}>{v.resSkipped}</div>
          <div style={{ font: "500 11px 'Space Grotesk'", color: '#8A8375' }}>skipped</div>
        </div>
      </div>

      {v.hasMistakes && (
        <button
          onClick={v.retryMistakes}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--accent,#D9552C)', color: '#fff', border: 'none', borderRadius: 16, padding: 17, font: "600 17px 'Space Grotesk'", width: '100%', marginTop: 16 }}
        >
          ↻ Retry mistakes first
        </button>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
        <button onClick={v.practice} style={{ border: '1px solid rgba(0,0,0,.12)', background: '#fff', borderRadius: 14, padding: 14, font: "600 14px 'Space Grotesk'", color: '#1C1A16' }}>Practice again</button>
        <button onClick={v.toDash} style={{ border: '1px solid rgba(0,0,0,.12)', background: '#fff', borderRadius: 14, padding: 14, font: "600 14px 'Space Grotesk'", color: '#1C1A16' }}>Dashboard</button>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A8375' }}>Marksheet</div>
        {v.resRows.map((r, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderLeft: `4px solid ${r.color}`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
              <div style={{ font: "600 14px/1.35 'Space Grotesk'", flex: 1 }}>{r.q}</div>
              <div style={{ font: "700 11px 'Space Grotesk'", letterSpacing: '.06em', textTransform: 'uppercase', color: r.color, flex: 'none' }}>{r.status}</div>
            </div>
            <div style={{ font: "400 13px/1.5 'Space Grotesk'", color: '#8A8375', marginTop: 4 }}>{r.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
