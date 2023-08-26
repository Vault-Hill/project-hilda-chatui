import { useAtom } from 'jotai';
import { useState } from 'react';
import sendIcon from '../assets/send-icon.svg';
import { connectionAtom } from '../state/atoms';

const Input: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [{ connected, reconnect, timedOut }] = useAtom(connectionAtom);
  const [{ messenger }] = useAtom(connectionAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    messenger?.send({
      action: 'prompt',
      message: input,
    });
    setInput('');
  };

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
      <form className='flex border-t bg-white shadow-md'>
        <input
          type='text'
          onChange={handleChange}
          value={input}
          className='flex-1 py-3 px-2 outline-none bg-white'
          placeholder='Enter a message here'
        />
        <button
          type='submit'
          onClick={handleSubmit}
          className='p-2 w-16 flex items-center justify-center shadow-xl my-1 mr-1 rounded-md vh-gradient hover:scale-95'
        >
          <img src={sendIcon} className='h-5 w-5' alt='send icon' />
        </button>
      </form>
    </div>
  );
};

export default Input;
