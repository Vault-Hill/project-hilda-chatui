type EventData = {
  message: string;
  role: string;
  timestamp: string;
};

export type Field = {
  head: string | null;
  element: string;
  name: string;
  label: string;
  type: 'text' | 'password' | 'number' | 'time' | 'email' | 'hidden' | 'date' | 'tel';
  placeholder: string;
  required?: boolean;
  options?: { key: string; value: string }[];
  optionsAsync?: {
    url: string;
  };
  visibleIf?: {
    field: string;
    value: 'Other'; // The value to trigger visibility
  };
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  next?: string | null;
}

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
