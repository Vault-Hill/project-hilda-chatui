import useChat from '../hooks/useChat';
import Dialog from './Dialog';
import Header from './Header';
import Input from './Input';

const ChatUI = () => {
  const { dialog, messenger } = useChat();

  return (
    <div className='max-w-lg rounded-t-2xl relative border border-gray-300 mx-auto h-[45rem] flex flex-col justify-between overflow-scroll bg-[#111827]'>
      <div>
        <Header />
        <Dialog dialog={dialog} />
      </div>
      <Input messenger={messenger} />
    </div>
  );
};

export default ChatUI;
