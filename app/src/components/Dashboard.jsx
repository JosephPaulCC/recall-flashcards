import { Fragment } from 'react';
import { SettingsIcon, SearchIcon } from '../icons';

export default function Dashboard({ v }) {
  return (
    <div style={{ flex: 1, padding: '22px 18px 40px', animation: 'fcPop .25s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ font: "700 28px/1.1 'Space Grotesk',sans-serif", letterSpacing: '-0.02em' }}>Recall</div>
          <div style={{ font: "400 13px/1.4 'Space Grotesk',sans-serif", color: '#8A8375', marginTop: 4 }}>{v.tagline}</div>
        </div>
        <button
          onClick={v.openSettings}
          aria-label="Settings"
          style={{ width: 44, height: 44, borderRadius: 14, border: '1px solid rgba(0,0,0,.1)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C1A16' }}
        >
          <SettingsIcon />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 20 }}>
        <div style={{ background: '#1C1A16', color: '#F6F2E9', borderRadius: 16, padding: '14px 12px' }}>
          <div style={{ font: "700 24px/1 'Space Grotesk',sans-serif" }}>{v.streak}</div>
          <div style={{ font: "500 11px/1.3 'Space Grotesk',sans-serif", color: 'rgba(246,242,233,.6)', marginTop: 6 }}>day streak</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 16, padding: '14px 12px' }}>
          <div style={{ font: "700 24px/1 'Space Grotesk',sans-serif", color: 'var(--accent,#D9552C)' }}>{v.accuracy}</div>
          <div style={{ font: "500 11px/1.3 'Space Grotesk',sans-serif", color: '#8A8375', marginTop: 6 }}>accuracy</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 16, padding: '14px 12px' }}>
          <div style={{ font: "700 24px/1 'Space Grotesk',sans-serif" }}>{v.timeSpent}</div>
          <div style={{ font: "500 11px/1.3 'Space Grotesk',sans-serif", color: '#8A8375', marginTop: 6 }}>studied</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid rgba(0,0,0,.1)', borderRadius: 14, padding: '0 14px', marginTop: 18 }}>
        <SearchIcon />
        <input
          value={v.query}
          onChange={(e) => v.setQuery(e.target.value)}
          placeholder="Search decks and cards…"
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: "400 15px 'Space Grotesk',sans-serif", padding: '14px 0', color: '#1C1A16', minWidth: 0 }}
        />
        {v.hasQuery && (
          <button
            onClick={v.clearQuery}
            style={{ border: 'none', background: 'rgba(0,0,0,.06)', borderRadius: 99, width: 24, height: 24, font: "600 13px 'Space Grotesk'", color: '#8A8375', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✕
          </button>
        )}
      </div>

      {v.hasQuery && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A8375' }}>{v.searchSummary}</div>
          {v.cardHits.map((hit, i) => (
            <div
              key={i}
              onClick={hit.open}
              style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 14, padding: 14, cursor: 'pointer' }}
            >
              <div style={{ font: "600 15px/1.35 'Space Grotesk'" }}>{hit.q}</div>
              <div style={{ font: "400 13px/1.4 'Space Grotesk'", color: '#8A8375', marginTop: 4 }}>{hit.a}</div>
              <div style={{ font: "500 11px 'Space Grotesk'", color: 'var(--accent,#D9552C)', marginTop: 8 }}>{hit.deckTitle} →</div>
            </div>
          ))}
        </div>
      )}

      {v.noQuery && (
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {v.deckGroups.map((g, gi) => (
            <Fragment key={g.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: gi > 0 ? 10 : 0 }}>
                <div style={{ font: "600 12px 'Space Grotesk'", letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A8375' }}>{g.label}</div>
                <div style={{ font: "500 12px 'Space Grotesk'", color: '#8A8375' }}>{g.count}</div>
              </div>
              {g.decks.map((dk) => (
                <div
                  key={dk.id}
                  onClick={dk.open}
                  style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 18, padding: 18, cursor: 'pointer', boxShadow: '0 1px 4px rgba(28,26,22,.04)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    <div style={{ font: "600 17px/1.3 'Space Grotesk'" }}>{dk.title}</div>
                    <div style={{ font: "700 15px 'Space Grotesk'", color: 'var(--accent,#D9552C)', flex: 'none' }}>{dk.pct}%</div>
                  </div>
                  <div style={{ height: 6, background: 'rgba(0,0,0,.07)', borderRadius: 99, marginTop: 12, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--accent,#D9552C)', borderRadius: 99, width: dk.pctW }} />
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 10, font: "500 12px 'Space Grotesk'", color: '#8A8375' }}>
                    <span>{dk.total} cards</span>
                    <span style={{ color: '#2E7D4F' }}>{dk.mastered} mastered</span>
                    <span>{dk.remaining} remaining</span>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
          <button
            onClick={v.newDeckOpen}
            style={{ border: '2px dashed rgba(0,0,0,.18)', background: 'transparent', borderRadius: 18, padding: 18, font: "600 15px 'Space Grotesk'", color: '#8A8375', width: '100%' }}
          >
            + New deck
          </button>
        </div>
      )}
    </div>
  );
}
