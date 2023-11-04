import { useAtom } from 'jotai';
import { BallTriangle } from 'react-loader-spinner';
import { accessKeyAtom, connectionAtom, createSocketAtom } from '../state/atoms';
import Main from './Main';
import Navbar from './Navbar';

const HomePage = () => {
  const [, createConnection] = useAtom(createSocketAtom);
  createConnection();
  const [{ connected, agentName, timedOut, logoUrl }] = useAtom(connectionAtom);
  const [accessKey] = useAtom(accessKeyAtom);

  // console.log('timedOut', timedOut);

  if (!accessKey) {
    return <div>Landing Page</div>;
  }

  if (!connected && !timedOut && !agentName) {
    return (
      <div className='fixed w-[100vw] h-[100vh] bg-black flex gap-10 justify-center items-center text-white text-2xl'>
        <BallTriangle
          height={50}
          width={50}
          radius={5}
          color='#FFDA4C'
          ariaLabel='ball-triangle-loading'
          visible={true}
        />
        <p>Establishing connection to the customer agent. Please wait...</p>
      </div>
    );
  }

  return (
    <div className='h-screen flex flex-col items-center bg-slate-50 dark:bg-black'>
      <Navbar agentName={agentName!} />
      <Main logoUrl={logoUrl} agentName={agentName!} />
    </div>
  );
};

export default HomePage;
