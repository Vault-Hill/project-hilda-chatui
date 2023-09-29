import { useAtom } from "jotai";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { connectionAtom, createSocketAtom } from "./state/atoms";
import { BallTriangle, Vortex } from "react-loader-spinner";

function App() {
  const [, createConnection] = useAtom(createSocketAtom);
  createConnection();
  const [{ connected, agentName, timedOut, logoUrl }] = useAtom(connectionAtom);

  if (!connected && !timedOut) {
    console.log(timedOut);
    return (
      <div className="fixed w-[100vw] h-[100vh] bg-black flex gap-10 justify-center items-center text-white text-2xl">
        <BallTriangle
          height={50}
          width={50}
          radius={5}
          color="#FFDA4C"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
        <p>Please wait while Hilda is booting up</p>
      </div>
    );
  }
  if (timedOut == true) {
    return (
      <div className="fixed w-[100vw] h-[100vh] bg-black flex gap-10 justify-center items-center text-white text-2xl">
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["#ffffff40", "#FFDA4C","#ffffff40", "#FFDA4C","#ffffff40", "#FFDA4C" ]}
        />
        <p>Please check your internet connection</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 dark:bg-black flex flex-col items-center">
      <Navbar agentName={agentName!} />
      <Main logoUrl={logoUrl} agentName={agentName!} />
    </div>
  );
}

export default App;
