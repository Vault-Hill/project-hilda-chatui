import { ChatEvent } from '../types';

const processEvent = (event: MessageEvent<unknown>) => {
  if (typeof event.data !== 'string') {
    console.log('Event data is Invalid');
    return
  }

  const eventData: ChatEvent = JSON.parse(event.data);

  const { action, orgId, data } = eventData;
  const { message, role, timestamp } = data;

  return { action, orgId, message, role, timestamp };
};

export default processEvent;
