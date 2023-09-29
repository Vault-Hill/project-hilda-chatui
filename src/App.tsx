import { useAtom } from 'jotai';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { connectionAtom, createSocketAtom } from './state/atoms';


function App() {
  const [, createConnection] = useAtom(createSocketAtom);
  createConnection();
  const [{ connected, agentName, logoUrl }] = useAtom(connectionAtom);

  if (!connected) {
    return <p>Dear Taiwo, A Cool transition/loading page will be nice here</p>;
  }

  return (
    <div className='h-screen bg-slate-50 dark:bg-black flex flex-col items-center'>
      <Navbar agentName={agentName!} />
      <Main logoUrl={logoUrl} agentName={agentName!} />
    </div>
  );
}

export default App;
