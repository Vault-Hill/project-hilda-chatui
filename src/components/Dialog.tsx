import { cx } from 'class-variance-authority';
import { useAtom } from 'jotai';
import React, { forwardRef, useEffect, useRef } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { dialogAtom } from '../state/atoms';
import { MessageType } from '../types';

type Message = {
  message: MessageType;
  isLast?: boolean;
};

const Message = forwardRef<HTMLDivElement, Message>(({ message, isLast }, ref) => {
  const containerClass = cx('flex w-full', {
    'justify-start rounded-md': message.role === 'assistant',
    "animate-pop": message.role === 'assistant' && isLast && !message.typing,
    'justify-end rounded-md': message.role === 'user',
  });

  const itemClass = cx('p-2 border', {
    'rounded-b-xl rounded-tr-xl bg-blue-500 text-white': message.role === 'assistant',
    'rounded-b-xl rounded-tl-xl bg-slate-100': message.role === 'user',
  });

  const nowTyping = message.typing && isLast;
  const wasTyping = message.typing && !isLast;

  if (wasTyping) return null;

  return (
    <section className={containerClass} ref={isLast ? ref : undefined}>
      <span className={itemClass}>
        {nowTyping ? (
          <ThreeDots
            height='20'
            width='20'
            radius='5'
            color='white'
            ariaLabel='three-dots-loading'
            visible={true}
          />
        ) : (
          message.message
        )}
      </span>
    </section>
  );
});

const Dialog: React.FC = () => {
  const [dialog] = useAtom(dialogAtom);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dialog]);

  return (
    <div className='flex flex-col gap-y-8 p-3'>
      {dialog.map((message, index, arr) => (
        <Message
          key={index}
          message={message}
          isLast={index === arr.length - 1}
          ref={lastMessageRef}
        />
      ))}
    </div>
  );
};

export default Dialog;
