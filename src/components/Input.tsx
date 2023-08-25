import { useState } from 'react';
import sendIcon from '../assets/send-icon.svg';
import { Messenger } from '../types';

const Input: React.FC<{ messenger: Messenger }> = ({ messenger }) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    messenger.send({
      action: 'prompt',
      message: input,
    });
    setInput('');
  };

  return (
    <form className='flex border-t sticky bottom-0 bg-white shadow-md'>
      <input
        type='text'
        onChange={handleChange}
        value={input}
        className='flex-1 py-3 px-2 outline-none border-r bg-white'
        placeholder='Enter your message'
      />
      <button
        type='submit'
        onClick={handleSubmit}
        className='p-2 w-16 flex items-center justify-center shadow-xl my-1 mr-1 rounded-md vh-gradient hover:scale-95'
      >
        <img src={sendIcon} className='h-5 w-5' alt='send icon' />
      </button>
    </form>
  );
};

export default Input;
