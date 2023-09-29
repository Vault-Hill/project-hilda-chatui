import Dialog from './Dialog';
import Header from './Header';
import History from './History';
import Input from './Input';

type Props = {
  agentName: string;
  logoUrl?: string;
};

const Main: React.FC<Props> = ({ logoUrl, agentName }) => {
  return (
    <div className='flex relative justify-between gap-10 px-7 md:px-52 flex-grow items-center w-full'>
      <History />
      <div className='w-[85vw] md:w-[60vw] md:rounded-lg relative border dark:border-[#ffffff26] border-[#00000026] h-[80vh] flex flex-col scrollbar-hide dark:bg-[#ffffff08] bg-[#00000015]'>
        <Header logoUrl={logoUrl} agentName={agentName} />
        <Dialog />
        <Input />
      </div>
    </div>
  );
};

export default Main;
