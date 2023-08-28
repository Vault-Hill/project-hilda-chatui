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
  const [{ connected, reconnect, timedOut }] = useAtom(connectionAtom);
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
    <div className='sticky bottom-0'>
      <div className='flex justify-center mb-2 group'>
        {!connected && timedOut && (
          <button
            onClick={reconnect}
            className='text-white p-2 bg-white bg-opacity-20 group-hover:scale-[98%] group-hover:bg-opacity-25 rounded-lg'
          >
            Start New Chat
          </button>
        )}
      </div>
      <div className='flex border-t shadow-md h-fit bg-white'>
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
            className='flex-1 pl-2 outline-none bg-transparent overflow-hidden resize-none'
            placeholder='Enter a message here'
            ref={(textarea) => {
              if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
              }
            }}
          />
        )}

        <div className='flex items-end'>
          <button type='button' onClick={toggleListening}>
            {listening ? (
              <div className='-mt-8'>
                <Bars
                  height='20'
                  width='40'
                  color='#4fa94d'
                  ariaLabel='bars-loading'
                  visible={true}
                />
              </div>
            ) : (
              <img src={micOffIcon} className='h-10 w-8 my-1 mr-1 bg-blue-300 border border-blue-600 shadow-lg rounded p-1' alt='' />
            )}
          </button>

          <button
            type='submit'
            onClick={handleSubmit}
            className={cx(
              'w-14 my-1 h-10 flex items-center justify-center shadow-xl mr-1 rounded-md  hover:scale-95 ',
              { 'vh-gradient opacity-50': input.length < 1, 'vh-gradient': input.length > 0 },
            )}
          >
            <img src={sendIcon} className='h-5 w-5' alt='send icon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
