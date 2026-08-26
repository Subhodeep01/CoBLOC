import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from './hooks/useSession';
import LeftPanel from './components/layout/LeftPanel';
import MainArea from './components/layout/MainArea';
import './index.css';

const MIN_WIDTH = 280;
const MAX_WIDTH = 720;
const DEFAULT_WIDTH = 384;

function App() {
  const session = useSession();
  const [panelWidth, setPanelWidth] = useState(() => {
    try {
      const saved = parseInt(localStorage.getItem('cobloc_panel_width'), 10);
      if (saved >= MIN_WIDTH && saved <= MAX_WIDTH) return saved;
    } catch { /* ignore */ }
    return DEFAULT_WIDTH;
  });
  const dragging = useRef(false);

  const onMove = useCallback(e => {
    if (!dragging.current) return;
    const w = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX));
    setPanelWidth(w);
  }, []);

  const onUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    setPanelWidth(w => {
      try { localStorage.setItem('cobloc_panel_width', String(w)); } catch { /* ignore */ }
      return w;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [onMove, onUp]);

  const startDrag = () => {
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel session={session} width={panelWidth} />
      <div
        onMouseDown={startDrag}
        onDoubleClick={() => setPanelWidth(DEFAULT_WIDTH)}
        title="Drag to resize, double-click to reset"
        className="w-1.5 shrink-0 cursor-col-resize bg-slate-200 hover:bg-emerald-400 active:bg-emerald-500 transition-colors"
      />
      <MainArea session={session} />
    </div>
  );
}

export default App;
