import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import micFilledIcon from "../assets/mic-filled.svg";
import sendIcon from "../assets/send-icon.svg";
import { capitalize } from "../helpers";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import { connectionAtom, formAtom } from "../state/atoms";
import { renderForm } from "./renderForm";

const Input: React.FC = () => {
	const [input, setInput] = useState("");
	const [filler, setFiller] = useState("");
	const [{ messenger, timedOut, connected, reconnect }] =
		useAtom(connectionAtom);
	const [form] = useAtom(formAtom);

	const { listening, toggleListening, transcript, interim } =
		useSpeechRecognition();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
	};

	const handleSubmit = () => {
		if (input.trim().length > 0)
			messenger?.call({
				action: "prompt",
				message: input,
			});
		setInput("");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	useEffect(() => {
		if (transcript.length > 0) {
			setInput(
				(prev) =>
					prev + `${prev.length > 0 ? ". " : ""}` + capitalize(transcript)
			);
			setFiller("");
		} else if (interim.length > 0) {
			setFiller(interim);
		}
	}, [transcript, interim]);

	return (
		<div className="flex flex-col">
			{/* <div className="flex overflow-x-auto py-3 px-3 pl-[20px]">
				{!timedOut &&
					cues &&
					cues.map((cue) => (
						<button
							className="mr-1 mt-1 whitespace-nowrap text-white shadow-md py-2 px-3 text-sm bg-white bg-opacity-10 hover:bg-opacity-20"
							key={cue}
							onClick={() => handleCueClick(cue)}
						>
							{cue}
						</button>
					))}
			</div> */}

			{(!form || timedOut) && (
				<section className="sticky bottom-0 flex gap-1 md:gap-5 h-fit m-2 md:m-5 md:mt-0 items-end">
					{listening ? (
						<p className="flex-1 h-max w-full p-[12px] overflow-hidden resize-none rounded-lg dark:bg-neutral-800 border bg-neutral-50 dark:border-gray-600 border-gray-300 dark:text-white">
							{input}
							<span className="text-gray-400 ml-1">
								{filler.length < 1 && input.length < 1
									? "Listening..."
									: filler}
							</span>
						</p>
					) : (
						<textarea
							disabled={timedOut || !connected}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							value={input}
							rows={1}
							tabIndex={0}
							spellCheck={false}
							className="flex-1 text-sm p-[10px] md:p-[13px] h-full outline-none overflow-hidden bg-white bg-opacity-10 rounded-[10px] border text-white border-white border-opacity-10 resize-none disabled:hover:cursor-not-allowed"
							placeholder="Enter a message here"
							ref={(textarea) => {
								if (textarea) {
									textarea.style.height = `${textarea.scrollHeight}px`;
									textarea.style.maxHeight = "200px";
									textarea.addEventListener("input", () => {
										textarea.style.height = "auto";
										textarea.style.height = `${textarea.scrollHeight}px`;
									});
								}
							}}
						/>
					)}

					{!timedOut && connected ? (
						<div className="flex items-center gap-1 md:gap-5">
							<button
								type="button"
								onClick={toggleListening}
								disabled={timedOut || !connected}
							>
								{listening ? (
									<div>
										<Bars
											height="20"
											width="40"
											color="green"
											ariaLabel="bars-loading"
											visible={true}
										/>
									</div>
								) : (
									<img
										src={micFilledIcon}
										className="h-5 w-5 md:h-8 md:w-8 mx-1"
										alt=""
									/>
								)}
							</button>

							<button
								type="submit"
								disabled={input.length < 1}
								onClick={handleSubmit}
								className="w-12 h-10 text-white md:w-24 md:h-12 flex items-center justify-center gap-3 shadow-xl mr-1 border border-white border-opacity-20 bg-white bg-opacity-10 rounded-[10px] disabled:cursor-not-allowed"
							>
								<span className="text-4 hidden md:block">Send</span>
								<img src={sendIcon} className="h-4 w-4" alt="send icon" />
							</button>
						</div>
					) : (
						<button
							className=" bg-white bg-opacity-10 rounded-[10px] border border-white border-opacity-20 h-12 text-xs md:text-base px-5 text-white shadow-xl"
							onClick={reconnect}
						>
							Start New Chat
						</button>
					)}
				</section>
			)}

			{!timedOut && form && (
				<section className="px-2 md:px-5">
					{form && renderForm(JSON.parse(form))}
				</section>
			)}
		</div>
	);
};

export default Input;
