export default function Toast({ v }) {
  if (!v.hasToast) return null;
  return (
    <div
      style={{
        position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)',
        background: '#1C1A16', color: '#F6F2E9', borderRadius: 12, padding: '12px 18px',
        font: "500 14px 'Space Grotesk'", boxShadow: '0 6px 20px rgba(0,0,0,.25)', zIndex: 60,
        animation: 'fcPop .2s ease', maxWidth: '88vw', textAlign: 'center',
      }}
    >
      {v.toast}
    </div>
  );
}
