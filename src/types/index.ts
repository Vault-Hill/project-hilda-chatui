type EventData = {
  message: string;
  role: string;
  timestamp: string;
};

export type Field = {
  element: string;
  name: string;
  type: 'text' | 'password' | 'number' | 'time' | 'email' | 'hidden' | 'date' | 'tel';
  label: string;
  value: string;
};

export type Form = { type: string; fields: Field[] };

export type ChatEvent = {
  action: string;
  orgId: string;
  sessionId: string;
  agentName: string;
  logoUrl: string;
  form?: Form;
  sessionTtl?: number;
  data: EventData;
};

export type MessageType = {
  orgId?: string;
  sessionId?: string;
  timestamp?: string;
  role: string;
  message?: string;
  typing?: boolean;
};

export type Command = {
  action: 'prompt' | 'disconnect';
  message?: string;
  adhoc?: string;
  ghost?: boolean;
};

export type Messenger = {
  call: (command: Command) => void;
};
