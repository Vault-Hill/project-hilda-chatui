import Dialog from './Dialog';
import Header from './Header';
import Input from './Input';

type Props = {
  agentName: string;
  logoUrl?: string;
};

const Main: React.FC<Props> = ({ logoUrl, agentName }) => {
  return (
    <div className='w-full mb-0 md:my-5 h-full scrollbar-hide'>
      <div className='md:rounded-lg h-full relative flex flex-col scrollbar-hide '>
        <Header logoUrl={logoUrl} agentName={agentName} />
        <Dialog />
        <Input />
      </div>
    </div>
  );
};

export default Main;
