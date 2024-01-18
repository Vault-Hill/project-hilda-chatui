import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Radio } from 'react-loader-spinner';
import avatar from '/avatar.png';
import cancelIcon from '../assets/cancel.svg';
import wifiIcon from '../assets/wifi.svg';
import { connectionAtom, socketAtom } from '../state/atoms';

type Props = {
  agentName: string;
  logoUrl?: string;
};

const Header: React.FC<Props> = ({ agentName }) => {
  const [{ connected, sessionTtl }] = useAtom(connectionAtom);
  const [socket] = useAtom(socketAtom);

  useEffect(() => {
    if (!sessionTtl) return;
    const currentTime = Date.now();
    const duration = sessionTtl - currentTime;

    const timeout = setTimeout(() => {
      socket?.close();
    }, duration);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionTtl]);

  return (
    <>
      <div className='flex justify-between items-center px-2 py-1 md:p-4 sticky top-0 mb-2 md:mb-5 lg:hidden'>
        <div className='flex items-center gap-3 md:gap-5'>
          <div className='w-8 h-8 md:w-14 md:h-14 rounded-full overflow-hidden bg-gray-100'>
            <img src={avatar} alt='avatar' />
          </div>
          <div className='flex flex-col justify-between'>
            <h1 className='font-bold text-sm md:text-xl text-white'>Ask {agentName}</h1>

            {connected ? (
              <Radio
                visible={true}
                height='20'
                width='20'
                ariaLabel='radio-loading'
                wrapperClass='radio-wrapper'
              />
            ) : (
              <div className='relative flex gap-x-1 md:gap-x-3 '>
                <section>
                  <img src={wifiIcon} className='h-3 w-3 md:h-5 md:w-5 mt-1 md:mt-0 dark:invert-[100%]' alt='' />
                  <img src={cancelIcon} className='h-3 w-3 md:h-5 md:w-5 absolute top-1 md:top-0' alt='' />
                </section>
                <p className='leading-5 text-xs md:text-sm text-rose-500'>
                  Your chat session has ended due to inactivity.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
