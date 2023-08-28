import { useAtom } from 'jotai';
import { createSocketAtom } from '../state/atoms';
import Dialog from './Dialog';
import Header from './Header';
import Input from './Input';

const ChatUI = () => {
  const [, createConnection] = useAtom(createSocketAtom);
  createConnection();

  return (
    <div className='max-w-lg rounded-t-2xl relative border border-gray-300 mx-auto h-[45rem] flex flex-col justify-between overflow-y-scroll bg-[#111827] shadow-2xl'>
      <div>
        <Header />
        <Dialog />
      </div>
      <Input />
    </div>
  );
};

export default ChatUI;
