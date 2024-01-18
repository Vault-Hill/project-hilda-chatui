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

export type Form = { title: string; fields: Field[] };

export type ChatEvent = {
  metadata: ChatEventMetaData
  data: ChatEventData
};

export type ChatEventMetaData = {
  mode: string;
  accessKey: string;
  botName?: string;
  avatarUrl?: string;
  session: { id: string; ttl: number };
  organization?: { id: string; name: string };
}

export type ChatEventData = {
  cues?: string[];
  message: string;
  form?: Form;
  timestamp?: number;
  status?: string;
  error?: string;
}

export type MessageType = {
  orgId?: string;
  sessionId?: string;
  timestamp?: number;
  role: string;
  message?: string;
  typing?: boolean;
  cues?: string[]
};

export type Command = {
  action: 'prompt' | 'disconnect';
  message?: string;
  adhoc?: string;
  ghost?: boolean;
};

export type QueryData = {
  data: { message?: string };
  metadata: ChatEventMetaData
}

export type Messenger = {
  call: (command: Command) => void;
};
