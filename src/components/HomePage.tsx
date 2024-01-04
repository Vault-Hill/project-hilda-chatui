import { useAtom } from "jotai";
import { BallTriangle } from "react-loader-spinner";
import { connectionAtom, createSocketAtom } from "../state/atoms";
import Main from "./Main";
import Sidebar from "./Sidebar";

const HomePage = () => {
	const [, createConnection] = useAtom(createSocketAtom);
	createConnection();
	const [{ connected, agentName, timedOut, logoUrl }] = useAtom(connectionAtom);

	if (!connected && !timedOut && !agentName) {
		return (
			<div className="fixed w-[100vw] h-[100vh] bg-[#0F0516] pl-5 pr-4 md:pl-0 flex gap-10 justify-center items-center text-white">
				<BallTriangle
					height={50}
					width={50}
					radius={5}
					color="#FFDA4C"
					ariaLabel="ball-triangle-loading"
					visible={true}
				/>
				<p className="text-sm md:text-2xl">
					Establishing connection to the customer agent. Please wait...
				</p>
			</div>
		);
	}

	return (
		<div className="h-screen w-screen relative flex overflow-hidden bg-[#0F0516] gap-x-[66px] px-[20px] lg:px-[45px] pt-[26px]">
			<div className="w-screen h-screen left-[40%] top-[-55px] absolute">
				<div className="w-[48%] h-[47%] left-[50%] top-0 absolute bg-[#5749FF80] bg-opacity-50 rounded-full blur-[1248.96px]" />
				<div className="w-[50%] h-[50%] left-0 top-[54%] absolute bg-black rounded-full blur-[1326.09px]" />
				<div className="w-[30%] h-[30%] left-[38%] top-[39%] absolute bg-[#672386] rounded-full blur-[908.11px]" />
			</div>
			<Sidebar agentName={agentName!} />
			<div className="pb-[3%] h-full w-full">
				<Main logoUrl={logoUrl} agentName={agentName!} />
			</div>
		</div>
	);
};

export default HomePage;
