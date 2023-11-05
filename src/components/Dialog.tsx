import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { cx } from 'class-variance-authority';
import { useAtom } from 'jotai';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { connectionAtom, messageAtom } from '../state/atoms';
import { MessageType } from '../types';

type Message = {
  message: MessageType;
  createFeedback: (data: unknown) => void;
  isLast?: boolean;
  isFirst?: boolean;
  isConnected?: boolean;
};

const Message = forwardRef<HTMLDivElement, Message>(
  ({ message, isFirst, isLast, isConnected, createFeedback }, ref) => {
    const [feedback, setFeedback] = useState<'like' | 'dislike' | undefined>();

    const containerClass = cx('flex w-full', {
      'justify-start rounded-md relative': message.role === 'assistant',
      'animate-pop': message.role === 'assistant' && isLast && !message.typing,
      'justify-end rounded-md': message.role === 'user',
    });

    const itemClass = cx('p-4 dark:text-white text-black rounded-b-xl  max-w-[35rem]', {
      'rounded-tr-xl bg-[#ffcb0520] relative': message.role === 'assistant',
      'rounded-tl-xl dark:bg-[#ffffff26] bg-[#00000026] ': message.role === 'user',
    });

    const nowTyping = message.typing && isLast;
    const wasTyping = message.typing && !isLast;

    const handleFeedback = (which: 'like' | 'dislike') => {
      if (!isFirst) {
        setFeedback(which);
        createFeedback({
          orgId: message.orgId,
          sessionId: message.sessionId,
          feedback: which,
        });
      }
    };

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
            <p>
              {message.message}
              <span className={cx({ hidden: isFirst || !isLast || !isConnected })}>
                <button
                  className='absolute top-0 -right-5'
                  onClick={() => handleFeedback('like')}
                  disabled={!!feedback}
                >
                  <HandThumbUpIcon
                    className={cx('h-5 w-5 text-gray-400 ', {
                      'text-green-300': feedback === 'like',
                      'hover:text-green-500': !feedback,
                    })}
                  />
                </button>
                <button
                  className='absolute top-0 -right-12'
                  onClick={() => handleFeedback('dislike')}
                  disabled={!!feedback}
                >
                  <HandThumbDownIcon
                    className={cx('h-5 w-5 text-gray-400', {
                      'text-red-300': feedback === 'dislike',
                      'hover:text-red-500': !feedback,
                    })}
                  />
                </button>
              </span>
            </p>
          )}
        </span>
      </section>
    );
  },
);

const Dialog: React.FC = () => {
  const [messages] = useAtom(messageAtom);
  const [{ totalDislikes, messenger, connected }, setConnection] = useAtom(connectionAtom);
  const [isEscalated, setIsEscalated] = useState(false);

  const { mutate: createFeedback } = useMutation({
    mutationKey: ['createFeedback'],
    mutationFn: (data: unknown) => axios.post(`${import.meta.env.VITE_BASE_URL}/feedback`, data),
    onSuccess: () => {
      setConnection((prev) => ({
        ...prev,
        totalDislikes: prev?.totalDislikes ? prev.totalDislikes + 1 : 1,
      }));
    },
  });

  if (!isEscalated && totalDislikes === 3) {
    setIsEscalated(true);
  }

  useEffect(() => {
    if (isEscalated) {
      setIsEscalated(false);
      messenger?.escalate({
        action: 'prompt',
        message: 'Escalate: Level 1',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEscalated]);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='flex flex-1 flex-col gap-y-8 p-3  md:px-6 h-[75%] overflow-y-scroll scrollbar-hide'>
      {messages.map((message, index, arr) => (
        <Message
          key={index}
          message={message}
          isFirst={index === 0}
          isLast={index === arr.length - 1}
          isConnected={connected}
          createFeedback={createFeedback}
          ref={lastMessageRef}
        />
      ))}
    </div>
  );
};

export default Dialog;
