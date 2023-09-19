import { Getter, Setter, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import processEvent from '../helpers/processEvent';
import { Command, MessageType, Messenger } from '../types';

type Connection = {
  orgId?: string;
  connected?: boolean;
  timedOut?: boolean;
  reconnect?: () => void;
  disconnect?: () => void;
  messenger?: Messenger;
};

export const dialogAtom = atom<MessageType[]>([]);
export const connectionAtom = atomWithStorage<Connection>('connection', {});
const socketAtom = atom<WebSocket | null>(null);

export const createSocketAtom = atom(null, (get: Getter, set: Setter) => {
  let socket = get(socketAtom);

  const setup = () => {
    console.log('connecting...',import.meta.env.VITE_WS_CONN_URL);
    set(connectionAtom, {});
    socket = new WebSocket(import.meta.env.VITE_WS_CONN_URL);
    set(socketAtom, socket);

    socket.onopen = () => {
      // console.log('connected');
      set(dialogAtom, []);
      set(connectionAtom, { connected: true, reconnect, disconnect, messenger });
    };

    socket.onclose = () => {
      // console.log('disconnected');
      set(connectionAtom, (prev) => ({ ...prev, connected: false, timedOut: true }));
    };

    socket.onmessage = (event) => {
      const data = processEvent(event);

      if (data) {
        const { message, orgId, role, timestamp } = data;

        if (!message) {
          set(dialogAtom, (prev) => prev.slice(0, -1));
          return;
        }

        set(connectionAtom, (prev) => ({ ...prev, orgId }));

        const response: MessageType = {
          timestamp,
          role,
          message,
        };

        set(dialogAtom, (prev) => [...prev, response]);
      }
    };

    const messenger = {
      send: (command: Command) => {
        const { orgId } = get(connectionAtom);

        const message: MessageType = {
          timestamp: new Date().toISOString(),
          role: 'user',
          message: command.message,
        };

        const typing: MessageType = {
          role: 'assistant',
          typing: true,
        };

        const query = {
          action: command.action,
          orgId,
          data: { message: command.message },
        };

        set(dialogAtom, (prev) => [...prev, message, typing]);
        socket?.send(JSON.stringify(query));
      },
    };
  };

  if (!socket) {
    setup();
  }

  const reconnect = () => {
    if (socket?.readyState === 3) {
      // console.log('reconnecting...');
      setup();
    }
  };

  const disconnect = () => {
    if (socket?.readyState === 1) {
      // console.log('disconnecting...');
      socket?.close();
    }
  };
});
