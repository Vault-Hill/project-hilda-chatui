import { useAtom } from "jotai";
import cancelIcon from "../assets/cancel.svg";
import wifiIcon from "../assets/wifi.svg";
import { connectionAtom } from "../state/atoms";

type Props = {
	agentName: string;
};

const Sidebar: React.FC<Props> = ({ agentName }) => {
	const [{ connected }] = useAtom(connectionAtom);
	return (
		<div className="bg-[#16091F] hidden lg:flex rounded-t-[20px] w-[32%] max-w-[418px] pt-[5%] flex-col">
			<h1 className="text-white text-3xl font-normal leading-7 w-full text-center">
				{agentName}
			</h1>
			<div className="w-full items-center flex justify-center mt-[22px] mb-14">
				{connected ? (
					<div className="w-[98px] h-[31px] bg-white bg-opacity-10 rounded-[10px] flex justify-center items-center gap-x-[5px] border border-white border-opacity-10">
						<div className="w-2 h-2 bg-green-400 rounded-full" />
						<p className="text-white text-opacity-60 text-[17px] font-normal leading-relaxed">
							Active
						</p>
					</div>
				) : (
					<div className="relative flex gap-x-1 md:gap-x-3 ">
						<section>
							<img
								src={wifiIcon}
								className="h-3 w-3 md:h-5 md:w-5 mt-1 md:mt-0"
								alt=""
							/>
							<img
								src={cancelIcon}
								className="h-3 w-3 md:h-5 md:w-5 absolute top-1 md:top-0"
								alt=""
							/>
						</section>
						<p className="leading-5 text-xs md:text-sm text-rose-500">
							Your chat session has ended due to inactivity.
						</p>
					</div>
				)}
			</div>
			<model-viewer
				src="https://models.readyplayer.me/655356349b792809cd988ffe.glb"
				camera-controls
				touch-action="pan-y"
				class="h-[70vh] w-full"
				alt={agentName}
			></model-viewer>
		</div>
	);
};

export default Sidebar;
