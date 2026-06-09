import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Remove legacy session entries that predate the fairBlockCount field
try {
  const sessions = JSON.parse(localStorage.getItem('cofads_sessions') || '[]');
  const cleaned = sessions.filter(s => s.fairBlockCount != null);
  if (cleaned.length !== sessions.length) {
    localStorage.setItem('cofads_sessions', JSON.stringify(cleaned));
  }
} catch { /* ignore */ }

try {
  const monitorSessions = JSON.parse(localStorage.getItem('cofads_monitor_sessions') || '[]');
  const cleaned = monitorSessions.filter(s => s.fairBlockCount != null);
  if (cleaned.length !== monitorSessions.length) {
    localStorage.setItem('cofads_monitor_sessions', JSON.stringify(cleaned));
  }
} catch { /* ignore */ }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
