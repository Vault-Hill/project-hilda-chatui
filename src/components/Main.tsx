import Dialog from './Dialog';
import Header from './Header';
import Input from './Input';

type Props = {
  agentName: string;
  logoUrl?: string;
};

const Main: React.FC<Props> = ({ logoUrl, agentName }) => {
  return (
    <div className='w-full max-w-4xl my-5 h-[80vh] overflow-scroll'>
      <div className='md:rounded-lg h-full relative border dark:border-[#ffffff26] border-[#00000026] flex flex-col scrollbar-hide dark:bg-[#ffffff08] bg-[#00000015]'>
        <Header logoUrl={logoUrl} agentName={agentName} />
        <Dialog />
        <Input />
      </div>
    </div>
  );
};

export default Main;
