import night from '../assets/night.svg';
import sun from '../assets/sun.svg';

const toggleDark = () => {
  document.documentElement.classList.toggle('dark');
};

type Props = {
  agentName: string;
};

const Navbar: React.FC<Props> = ({ agentName }) => {
  return (
    <div className='w-full flex px-5 justify-center py-6 border-b dark:border-b-gray-800 border-b-gray-300'>
      <div className='w-full max-w-4xl flex justify-between items-center'>
        <h1 className='dark:text-white text-black text-3xl'>{agentName}</h1>

        <div
          className='relative dark:bg-[#ffffff1a] bg-[#0000001a] rounded-full flex p-2 gap-2 cursor-pointer dark-toggle'
          onClick={toggleDark}
        >
          <div className='bg-[#ffcb0580] h-7 z-0 w-7 mr-2 rounded-full absolute dark:right-[calc(100%-2.25rem)] dark:ml-2 dark:mr-0 transition-[.5s] right-0'></div>

          <img src={night} className='h-7 w-7  rounded-full p-1 z-10' />
          <img src={sun} className='h-7 w-7 rounded-full p-1 z-10' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
