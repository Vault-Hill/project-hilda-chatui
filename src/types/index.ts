type EventData = {
  message: string;
  role: string;
  timestamp: string;
};

export type ChatEvent = {
  action: string;
  orgId: string;
  data: EventData;
};

export type MessageType = {
  timestamp?: string;
  role: string;
  message?: string;
  typing?: boolean;
};

export type Command = { action: 'prompt'; message: string };

export type Messenger = {
  send: (command: Command) => void;
};
