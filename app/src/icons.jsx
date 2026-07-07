export function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="3.2"></circle>
      <path d="M19.4 15a1.6 1.6 0 00.32 1.77l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.6 1.6 0 00-1.77-.32 1.6 1.6 0 00-1 1.47V21a2 2 0 11-4 0v-.09a1.6 1.6 0 00-1-1.47 1.6 1.6 0 00-1.77.32l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.6 1.6 0 00.32-1.77 1.6 1.6 0 00-1.47-1H3a2 2 0 110-4h.09a1.6 1.6 0 001.47-1 1.6 1.6 0 00-.32-1.77l-.06-.06a2 2 0 112.83-2.83l.06.06a1.6 1.6 0 001.77.32h0a1.6 1.6 0 001-1.47V3a2 2 0 114 0v.09a1.6 1.6 0 001 1.47h0a1.6 1.6 0 001.77-.32l.06-.06a2 2 0 112.83 2.83l-.06.06a1.6 1.6 0 00-.32 1.77v0a1.6 1.6 0 001.47 1H21a2 2 0 110 4h-.09a1.6 1.6 0 00-1.47 1z"></path>
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8A8375" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="7"></circle>
      <path d="M21 21l-4.3-4.3" strokeLinecap="round"></path>
    </svg>
  );
}

export function BackIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1C1A16" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M15 5l-7 7 7 7"></path>
    </svg>
  );
}

export function EditIcon({ stroke = '#1C1A16', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" {...props}>
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"></path>
    </svg>
  );
}

export function TrashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#C13B2A" strokeWidth="1.8" strokeLinecap="round" {...props}>
      <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6"></path>
    </svg>
  );
}

export function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M7 5l12 7-12 7z"></path>
    </svg>
  );
}

export function EyeOffIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"></path>
      <circle cx="12" cy="12" r="2.5"></circle>
    </svg>
  );
}

export function SpeakerIcon({ color = 'currentColor', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...props}>
      <path d="M3 9v6h4l5 5V4L7 9H3z" fill={color}></path>
      <path d="M16.5 8.5a5 5 0 010 7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"></path>
    </svg>
  );
}

export function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z"></path>
    </svg>
  );
}

export function StrikeEyeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-6.5 0-10-8-10-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c6.5 0 10 8 10 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" strokeLinecap="round"></path>
    </svg>
  );
}
