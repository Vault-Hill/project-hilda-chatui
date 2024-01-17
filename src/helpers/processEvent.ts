import { ChatEvent } from '../types';

const processEvent = (event: MessageEvent<unknown>) => {
  if (typeof event.data !== 'string') {
    console.log('Event data is Invalid');
    return;
  }

  const eventData: ChatEvent = JSON.parse(event.data);

  const { data, metadata } = eventData;

  const { message, timestamp } = data;

  const { organization, session, botName, avatarUrl } = metadata

  return {
    orgId: organization?.id,
    sessionId: session?.id,
    agentName: botName,
    logoUrl: avatarUrl,
    message,
    role: 'assistant',
    cues: data?.cues,
    timestamp,
    form: data?.form ?? null,
    sessionTtl: session.ttl,
    metadata,
  };
};

export default processEvent;
