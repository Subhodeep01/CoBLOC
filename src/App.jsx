import { useSession } from './hooks/useSession';
import LeftPanel from './components/layout/LeftPanel';
import MainArea from './components/layout/MainArea';
import './index.css';

function App() {
  const session = useSession();

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel session={session} />
      <MainArea session={session} />
    </div>
  );
}

export default App;
