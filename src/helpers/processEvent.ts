import { ChatEvent } from '../types';

const processEvent = (event: MessageEvent<unknown>) => {
  if (typeof event.data !== 'string') {
    console.log('Event data is Invalid');
    return;
  }

  const eventData: ChatEvent = JSON.parse(event.data);

  const { action, orgId, agentName, logoUrl, data } = eventData;

  const { message, role, timestamp } = data;

  return { action, orgId, agentName, logoUrl, message, role, timestamp };
};

export default processEvent;
