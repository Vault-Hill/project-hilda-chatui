import night from "../assets/night.svg";
import sun from "../assets/sun.svg";

const toggleDark = () => {
  document.documentElement.classList.toggle("dark");
};

const Nav = () => {
  return (
    <div className="flex md:px-52 px-10 py-6 border-b-[1px] dark:border-b-[#ffffff1a] border-b-[#00000033] justify-between items-center w-full">
      <div className="dark:text-white text-black text-3xl leading-[1.875rem] self-center mt-2">Hilda</div>
      <div className="relative dark:bg-[#ffffff1a] bg-[#0000001a] rounded-full flex p-2 gap-2 cursor-pointer dark-toggle" onClick={toggleDark}>
        <div className="bg-[#ffcb0580] h-7 z-0 w-7 mr-2 rounded-full absolute dark:right-[calc(100%-2.25rem)] dark:ml-2 dark:mr-0 transition-[.5s] right-0"></div>
        <div className="z-10">
          <img src={night} className="h-7 w-7  rounded-full  p-1" />
        </div>
        <div className="z-10">
          <img src={sun} className="h-7 w-7 rounded-full  p-1" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
