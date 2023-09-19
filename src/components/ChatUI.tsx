import { useAtom } from "jotai";
import { createSocketAtom } from "../state/atoms";
import Dialog from "./Dialog";
import Header from "./Header";
import Input from "./Input";
import History from "./History";

const ChatUI = () => {
  const [, createConnection] = useAtom(createSocketAtom);
  createConnection();

  return (
    <div className="flex relative justify-between gap-10 px-7 md:px-52 flex-grow items-center w-full">
      <History />
      <div className="w-[85vw] md:w-[60vw]  md:rounded-lg relative border dark:border-[#ffffff26] border-[#00000026] h-[80vh] flex flex-col justify-between scrollbar-hide dark:bg-[#ffffff08] bg-[#00000015]">
        
          <Header />
          <Dialog />
          <Input />
        
      
          
      
      </div>
    </div>
  );
};

export default ChatUI;
