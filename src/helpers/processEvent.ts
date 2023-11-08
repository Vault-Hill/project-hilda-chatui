import { ChatEvent } from '../types';

const processEvent = (event: MessageEvent<unknown>) => {
  console.log('Event: ', event)
  if (typeof event.data !== 'string') {
    console.log('Event data is Invalid');
    return;
  }

  const eventData: ChatEvent = JSON.parse(event.data);

  console.log('Event Data: ', eventData);

  const { action, orgId, sessionId, agentName, logoUrl, data, form, sessionTtl } = eventData;

  const { message, role, timestamp } = data;

  return {
    action,
    orgId,
    sessionId,
    agentName,
    logoUrl,
    message,
    role,
    timestamp,
    form,
    sessionTtl,
  };
};

export default processEvent;
