import { Getter, Setter, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import processEvent from '../helpers/processEvent';
import { Command, MessageType, Messenger } from '../types';

type Connection = {
  orgId?: string;
  totalDislikes?: number;
  adhoc?: string;
  agentName?: string;
  logoUrl?: string;
  connected?: boolean;
  timedOut?: boolean;
  reconnect?: () => void;
  disconnect?: () => void;
  messenger?: Messenger;
  sessionTtl?: number;
};

export const messageAtom = atom<MessageType[]>([]);
export const accessKeyAtom = atomWithStorage<string>('acc_key', '');
export const connectionAtom = atomWithStorage<Connection>('connection', {});
export const formAtom = atomWithStorage<string>('form', '');
export const socketAtom = atom<WebSocket | null>(null);

export const createSocketAtom = atom(null, (get: Getter, set: Setter) => {
  let socket = get(socketAtom);
  const searchParams = new URLSearchParams(document.location.search);
  set(accessKeyAtom, searchParams.get('token') || '');
  const accessKey = get(accessKeyAtom);

  // TODO Ayesha accessKey
  const AYESHA_ACCESS_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiVTJGc2RHVmtYMTlHcTV1SFJhZm9SSVRkbWFhZEI3bkt1Mkt6c0ZTaS9VaUdBbzh5UkhMOVFDeitKUVYzMEw3Z3NWbzRoV2x1SWxCMkJvS2NRcFhaTXE5c3ZKZG5ONkpybUtjZEJNemRTNW5ZejJ6cFNJYktnaktZOTJ3NVhlKzQiLCJpYXQiOjE2OTkxNzcyODUsImF1ZCI6Ik5pZ2NvbXNhdCBjdXN0b21lcnMiLCJpc3MiOiJWYXVsdCBIaWxsIn0.h21RQqHCzIkPUH56vW3ZOkRao8qQlKnpPw2xWcLXWww';

  const setup = () => {
    // console.log('connecting...');
    set(connectionAtom, {});
    socket = new WebSocket(
      `${import.meta.env.VITE_WS_CONN_URL}?acc_key=${accessKey ? accessKey : AYESHA_ACCESS_KEY}`,
    );
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
        const { message, orgId, sessionId, agentName, logoUrl, role, timestamp, form, sessionTtl } =
          data;

        if (!message) {
          set(messageAtom, (prev) => prev.slice(0, -1));
          return;
        }

        if (form) {
          set(formAtom, JSON.stringify(form));
        }

        set(connectionAtom, (prev) => ({ ...prev, orgId, agentName, logoUrl, sessionTtl }));

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
      call: (command: Command) => {
        const { orgId, totalDislikes, agentName, adhoc } = get(connectionAtom);

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
          totalDislikes,
          adhoc: command?.adhoc || adhoc,
          data: { message: command?.message },
        };

        if (!command.ghost) {
          set(messageAtom, (prev) => [...prev, message, typing]);
        }

        if (command.ghost) {
          set(messageAtom, (prev) => [...prev, typing]);
        }

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
