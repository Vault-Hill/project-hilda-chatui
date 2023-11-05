import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import micOffIcon from '../assets/mic-off.svg';
import sendIcon from '../assets/send-icon.svg';
import { capitalize } from '../helpers';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { connectionAtom } from '../state/atoms';

const Input: React.FC = () => {
  const [input, setInput] = useState('');
  const [filler, setFiller] = useState('');
  const [{ messenger, timedOut, connected, reconnect }] = useAtom(connectionAtom);

  const { listening, toggleListening, transcript, interim } = useSpeechRecognition();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.trim().length > 0)
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
    <div className='sticky bottom-0 flex gap-1 md:gap-5 h-fit m-2 md:m-5 items-end'>
      {listening ? (
        <p className='flex-1 h-max w-full p-[12px] overflow-hidden resize-none rounded-lg dark:bg-neutral-800 border bg-neutral-50 dark:border-gray-600 border-gray-300 dark:text-white'>
          {input}
          <span className='text-gray-400 ml-1'>
            {filler.length < 1 && input.length < 1 ? 'Listening...' : filler}
          </span>
        </p>
      ) : (
        <textarea
          disabled={timedOut || !connected}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={input}
          rows={1}
          tabIndex={0}
          spellCheck={false}
          className='flex-1 p-[13px] outline-none overflow-hidden rounded-lg dark:bg-neutral-800 border bg-neutral-50 dark:border-gray-600 border-gray-300 dark:text-white text-black resize-none'
          placeholder='Send a message'
          ref={(textarea) => {
            if (textarea) {
              textarea.style.height = `${textarea.scrollHeight}px`;
              textarea.style.maxHeight = '200px';
              textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
              });
            }
          }}
        />
      )}

      {!timedOut && connected ? (
        <div className='flex items-center gap-1 md:gap-5'>
          <button type='button' onClick={toggleListening} disabled={timedOut || !connected}>
            {listening ? (
              <div>
                <Bars
                  height='20'
                  width='40'
                  color='green'
                  ariaLabel='bars-loading'
                  visible={true}
                />
              </div>
            ) : (
              <img src={micOffIcon} className='h-8 w-8 mx-1' alt='' />
            )}
          </button>

          <button
            type='submit'
            disabled={input.length < 1}
            onClick={handleSubmit}
            className='w-12 md:w-24 h-12 flex items-center justify-center gap-3 bg-yellow-300 shadow-xl mr-1 rounded-md  hover:bg-yellow-400 disabled:hover:bg-yellow-300 disabled:cursor-not-allowed'
          >
            <span className='text-4 hidden md:block'>Send</span>
            <img src={sendIcon} className='h-4 w-4' alt='send icon' />
          </button>
        </div>
      ) : (
        <button
          className='bg-yellow-300 h-12 rounded-md px-5 hover:bg-yellow-400 shadow-xl'
          onClick={reconnect}
        >
          Start New Chat
        </button>
      )}
    </div>
  );
};

export default Input;
