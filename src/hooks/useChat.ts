import { useAtom } from 'jotai';
import { useState } from 'react';
import processEvent from '../helpers/processEvent';
import { sessionAtom } from '../state/atoms';
import { Command, MessageType } from '../types';

const socket = new WebSocket(import.meta.env.VITE_WS_CONN_URL || '');

const useChat = () => {
  const [dialog, setDialog] = useState<MessageType[]>([]);
  const [orgId, setOrgId] = useState<string>('');
  const [, setSession] = useAtom(sessionAtom);

  socket.onopen = () => {
    console.log('connected');
  };

  socket.onmessage = (event) => {
    const data = processEvent(event);

    if (data) {
      const { action, message, orgId, role, timestamp } = data;

      const response: MessageType = {
        timestamp,
        role,
        message,
      };

      if (action === 'connect') {
        setSession({ connected: true });
        setOrgId(orgId);
      }

      setDialog((prev) => {
        const last = prev[prev.length - 1];

        if (last && last.role === 'assistant') {
          prev[prev.length - 1] = response;
          return [...prev];
        }

        return [...prev, response];
      });
    }
  };

  const messenger = {
    send: (command: Command) => {
      const message: MessageType = {
        timestamp: new Date().toISOString(),
        role: 'user',
        message: command.message,
      };

      const typing: MessageType = {
        role: 'assistant',
      };

      const query = {
        action: command.action,
        orgId,
        data: { message: command.message },
      };

      setDialog((prev) => [...prev, message, typing]);
      socket.send(JSON.stringify(query));
    },
  };

  return { dialog, messenger };
};

export default useChat;
