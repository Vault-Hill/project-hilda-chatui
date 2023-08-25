import { cx } from 'class-variance-authority';
import { MessageType } from '../types';
import { ThreeDots } from 'react-loader-spinner';

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  const containerClass = cx('flex w-full', {
    'justify-start rounded-md': message.role === 'assistant',
    'justify-end rounded-md': message.role === 'user',
  });

  const itemClass = cx('p-2 border', {
    'rounded-b-xl rounded-tr-xl bg-blue-500 text-white': message.role === 'assistant',
    'rounded-b-xl rounded-tl-xl bg-slate-100': message.role === 'user',
  });

  const isTyping = !message.message && message.role === 'assistant';

  return (
    <div className={containerClass}>
      <span className={itemClass}>
        {isTyping ? (
          <ThreeDots
            height='30'
            width='30'
            radius='9'
            color='white'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            visible={true}
          />
        ) : (
          message.message
        )}
      </span>
    </div>
  );
};

const Dialog: React.FC<{ dialog: MessageType[] }> = ({ dialog }) => (
  <div className='flex flex-col gap-y-8 p-3'>
    {dialog.map((message, index) => (
      <Message key={index} message={message} />
    ))}
  </div>
);

export default Dialog;
