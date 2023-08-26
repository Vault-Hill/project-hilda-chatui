import { useAtom } from 'jotai';
import { Radio } from 'react-loader-spinner';
import avatar from '../assets/avatar.png';
import disconnIcon from '../assets/disconn-icon.svg';
import { connectionAtom } from '../state/atoms';

const Header: React.FC = () => {
  const [{connected, timedOut}] = useAtom(connectionAtom);

  return (
    <>
      <div className='flex justify-between items-center p-4 sticky top-0 bg-[#111827]'>
        <div className='flex items-center gap-5'>
          <div className='w-14 h-14 rounded-full overflow-hidden bg-gray-100'>
            <img src={avatar} alt='avatar' />
          </div>
          <div className='flex flex-col justify-between'>
            <h1 className='font-bold text-xl text-white'>Ask Hilda</h1>

            {connected ? (
              <Radio
                visible={true}
                height='20'
                width='20'
                ariaLabel='radio-loading'
                wrapperClass='radio-wrapper'
              />
            ) : (
              <img src={disconnIcon} className='h-5 w-5' alt='' />
            )}
          </div>
        </div>
        {/* <div className='flex h-full'>
      <button className='px-2 py-1 bg-rose-100 rounded-md border border-red-500 text-sm'>
        Clear
      </button>
    </div> */}
      </div>
      {!connected && !timedOut && <p className='text-gray-100 text-center'>Connecting...</p>}
    </>
  );
};

export default Header;
