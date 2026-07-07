import { useRecall } from './useRecall';
import Dashboard from './components/Dashboard';
import DeckView from './components/DeckView';
import Study from './components/Study';
import Results from './components/Results';
import Onboarding from './components/Onboarding';
import Toast from './components/Toast';
import Modal from './components/Modal';

export default function App() {
  const v = useRecall();

  return (
    <div
      style={{
        '--accent': v.accent,
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100dvh',
        background: '#F6F2E9',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        color: '#1C1A16',
        overflow: 'hidden',
      }}
    >
      {v.isDash && <Dashboard v={v} />}
      {v.isDeck && <DeckView v={v} />}
      {v.isStudy && <Study v={v} />}
      {v.isResults && <Results v={v} />}

      <Toast v={v} />
      {v.showOnboarding && <Onboarding v={v} />}
      {v.hasModal && <Modal v={v} />}
    </div>
  );
}
