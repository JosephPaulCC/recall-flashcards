import DeckTitleModal from './modals/DeckTitleModal';
import CardModal from './modals/CardModal';
import BulkModal from './modals/BulkModal';
import SettingsModal from './modals/SettingsModal';
import VoiceModal from './modals/VoiceModal';
import ConfirmModal from './modals/ConfirmModal';

export default function Modal({ v }) {
  return (
    <div
      onClick={v.closeModal}
      style={{ position: 'fixed', inset: 0, background: 'rgba(28,26,22,.5)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', animation: 'fcFade .2s ease' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 430, background: '#F6F2E9', borderRadius: '24px 24px 0 0', padding: '24px 20px 30px', animation: 'fcSheet .3s ease', maxHeight: '86dvh', overflowY: 'auto' }}
      >
        {v.isModalDeckTitle && <DeckTitleModal v={v} />}
        {v.isModalCard && <CardModal v={v} />}
        {v.isModalBulk && <BulkModal v={v} />}
        {v.isModalSettings && <SettingsModal v={v} />}
        {v.isModalVoice && <VoiceModal v={v} />}
        {v.isModalConfirm && <ConfirmModal v={v} />}
      </div>
    </div>
  );
}
