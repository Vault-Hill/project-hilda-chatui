import { cx } from 'class-variance-authority';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import micOffIcon from '../assets/mic-off.svg';
import sendIcon from '../assets/send-icon.svg';
import { capitalize } from '../helpers';
import { connectionAtom } from '../state/atoms';
import useSpeechRecognition from './hooks/useSpeechRecognition';

const Input: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [filler, setFiller] = useState<string>('');
  const [{ messenger }] = useAtom(connectionAtom);

  const { listening, toggleListening, transcript, interim } = useSpeechRecognition();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    messenger?.send({
      action: 'prompt',
      message: input,
    });
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (transcript.length > 0) {
      setInput((prev) => prev + `${prev.length > 0 ? '. ' : ''}` + capitalize(transcript));
      setFiller('');
    } else if (interim.length > 0) {
      setFiller(interim);
    }
  }, [transcript, interim]);

  return (
    <div className='sticky bottom-0 rounded-lg overflow-hidden  h-fit flex-grow'>
      <div className='flex gap-5 h-fit m-5  items-center'>
        {listening ? (
          <p className='flex-1 w-full pl-2'>
            {input}
            <span className='text-gray-400 ml-1'>
              {filler.length < 1 && input.length < 1 ? 'Listening...' : filler}
            </span>
          </p>
        ) : (
          <textarea
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={input}
            className='flex-1 p-2 outline-none h-12 overflow-hidden resize-none rounded-xl dark:bg-[#ffffff26] border bg-[#f5f5f599] dark:border-[#ffffff26] border-[#00000026] dark:text-white text-black placeholder:align-middle' 
            placeholder='Enter a message here'
    
          />
        )}

        <div className='flex items-center gap-5'>
          <button type='button' onClick={toggleListening}>
            {listening ? (
              <div >
                <Bars
                  height='20'
                  width='40'
                  color='#ffcb0580'
                  ariaLabel='bars-loading'
                  visible={true}
                />
              </div>
            ) : (
              <img src={micOffIcon} className='h-8 w-6' alt='' />
            )}
          </button>

          <button
            type='submit'
            onClick={handleSubmit}
            className={cx(
              'w-24 my-1 h-12 flex items-center justify-center gap-3 shadow-xl mr-1 rounded-md  hover:scale-95 ',
              { 'bg-[#FFDA4D] opacity-50': input.length < 1, 'bg-[#FFDA4D]': input.length > 0 },
            )}
          >
            <span className='text-4'>Send</span>
            <img src={sendIcon} className='h-4 w-4' alt='send icon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
