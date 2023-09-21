import { connectionAtom } from "../state/atoms";
import { useAtom } from "jotai";
import historyIcon from "../assets/history.svg";
import chatIcon from "../assets/chat.svg";

const History = () => {
  const [{ connected, reconnect, timedOut }] = useAtom(connectionAtom);

  return (
    <div className="flex-col gap-5 h-[80vh] w-80 hidden md:flex">
      {!connected && timedOut && (
        <div className="flex justify-center group">
          <button
            onClick={reconnect}
            className="dark:text-white text-black w-full py-3 text-[14px] bg-[#ffcb0520] bg-opacity-20 group-hover:scale-[98%] group-hover:bg-opacity-25 rounded-lg"
          >
            New Chat +
          </button>
        </div>
      )}
      <div className="dark:bg-[#ffffff08] bg-[#00000015] border rounded-lg dark:border-[#ffffff26] border-[#00000026] flex-grow">
        <div className="p-5 border-b dark:border-[#ffffff26] border-[#00000026] flex items-center gap-2 ">
          <img src={historyIcon} className="w-5 h-5 filter dark:invert-[100%]" alt="" />
          <p className="dark:text-white text-black text-[16px] font-semibold">History</p>
        </div>
        <div className="flex gap-2 p-5">
          <img src={chatIcon} className="w-5 h-5 filter dark:invert-[100%]" alt="" />
          <p className="dark:text-white text-black text-sm">
            Your chat history will appear here
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
