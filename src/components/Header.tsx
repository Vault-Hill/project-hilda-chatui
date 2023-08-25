import { cx } from 'class-variance-authority';
import { useAtom } from 'jotai';
import { Radio } from 'react-loader-spinner';
import avatar from '../assets/avatar.png';
import { sessionAtom } from '../state/atoms';

const Header: React.FC = () => {
  const [session] = useAtom(sessionAtom);
  return (
    <>
      <div className='flex justify-between items-center p-4 sticky top-0 bg-[#111827]'>
        <div className='flex items-center gap-5'>
          <div className='w-14 h-14 rounded-full overflow-hidden bg-gray-100'>
            <img src={avatar} alt='avatar' />
          </div>
          <div className='flex flex-col justify-between'>
            <h1 className='font-bold text-xl text-white'>Ask Hilda</h1>

            <div className={cx({ invisible: !session.connected })}>
              <Radio
                visible={true}
                height='20'
                width='20'
                ariaLabel='radio-loading'
                wrapperStyle={{}}
                wrapperClass='radio-wrapper'
              />
            </div>
          </div>
        </div>
        {/* <div className='flex h-full'>
      <button className='px-2 py-1 bg-rose-100 rounded-md border border-red-500 text-sm'>
        Clear
      </button>
    </div> */}
      </div>
      {!session.connected && <p className='text-gray-100 text-center'>Connecting...</p>}
    </>
  );
};

export default Header;
