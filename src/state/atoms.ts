import { Getter, Setter, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import processEvent from '../helpers/processEvent';
import { Command, MessageType, Messenger } from '../types';

type Connection = {
  orgId?: string;
  totalDislikes?: number;
  escalation?: string;
  agentName?: string;
  logoUrl?: string;
  connected?: boolean;
  timedOut?: boolean;
  reconnect?: () => void;
  disconnect?: () => void;
  messenger?: Messenger;
};

export const messageAtom = atom<MessageType[]>([]);
export const accessKeyAtom = atomWithStorage<string>('acc_key', '');
export const connectionAtom = atomWithStorage<Connection>('connection', {});
const socketAtom = atom<WebSocket | null>(null);

export const createSocketAtom = atom(null, (get: Getter, set: Setter) => {
  let socket = get(socketAtom);
  const searchParams = new URLSearchParams(document.location.search);
  set(accessKeyAtom, searchParams.get('token') || '');
  const accessKey = get(accessKeyAtom);

  const setup = () => {
    // console.log('connecting...');
    set(connectionAtom, {});
    socket = new WebSocket(`${import.meta.env.VITE_WS_CONN_URL}?acc_key=${accessKey}`);
    set(socketAtom, socket);

    socket.onopen = () => {
      // console.log('connected');
      set(messageAtom, []);
      set(connectionAtom, { connected: true, reconnect, disconnect, messenger });
    };

    socket.onclose = () => {
      // console.log('disconnected');
      set(connectionAtom, (prev) => ({ ...prev, connected: false, timedOut: true }));

      const response: MessageType = {
        timestamp: new Date().toISOString(),
        role: 'assistant',
        message:
          "As you're no longer asking questions, I'll go ahead and close the session. Feel free to reach out later if you have more inquiries or need assistance. Thank you for using our service.",
      };

      set(messageAtom, (prev) => [...prev, response]);
    };

    socket.onmessage = (event) => {
      const data = processEvent(event);

      if (data) {
        const { message, orgId, sessionId, agentName, logoUrl, role, timestamp } = data;

        if (!message) {
          set(messageAtom, (prev) => prev.slice(0, -1));
          return;
        }

        set(connectionAtom, (prev) => ({ ...prev, orgId, agentName, logoUrl }));

        const response: MessageType = {
          orgId,
          sessionId,
          timestamp,
          role,
          message,
        };

        set(messageAtom, (prev) => [...prev, response]);
      }
    };

    const messenger = {
      send: (command: Command) => {
        const { orgId, totalDislikes, agentName, escalation } = get(connectionAtom);

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
          agentName,
          escalation,
          totalDislikes,
          data: { message: command.message },
        };

        set(messageAtom, (prev) => [...prev, message, typing]);
        socket?.send(JSON.stringify(query));
      },
      escalate: (command: Command) => {
        const { orgId, agentName, escalation } = get(connectionAtom);

        const query = {
          action: command.action,
          orgId,
          agentName,
          escalation: escalation ?? 'Level 1',
          data: { message: command.message },
        };

        set(connectionAtom, (prev) => ({ ...prev, escalation: query.escalation }));
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
