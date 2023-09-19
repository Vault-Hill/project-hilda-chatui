import ChatUI from './components/ChatUI';
import Nav from './components/Nav';

function App() {
  return (
    <div className='h-screen bg-slate-50 dark:bg-black flex flex-col'>
      <Nav/>
      <ChatUI />
    </div>
  );
}

export default App;
