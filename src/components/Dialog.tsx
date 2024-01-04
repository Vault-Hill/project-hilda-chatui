import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { cx } from "class-variance-authority";
import { useAtom } from "jotai";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { connectionAtom, messageAtom } from "../state/atoms";
import { MessageType } from "../types";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

type Message = {
	message: MessageType;
	createFeedback: (data: unknown) => void;
	isLast?: boolean;
	isFirst?: boolean;
	isConnected?: boolean;
};

const Message = forwardRef<HTMLDivElement, Message>(
	({ message, isLast }, ref) => {
		const containerClass = cx("flex w-full text-xs md:text-base", {
			"justify-start rounded-md relative": message.role === "assistant",
			"animate-pop": message.role === "assistant" && isLast && !message.typing,
			"justify-end rounded-md": message.role === "user",
		});

		const itemClass = cx(
			"p-4 text-white rounded-b-xl max-w-[80%] md:max-w-[35rem]",
			{
				"rounded-tr-xl bg-white bg-opacity-10 relative": message.role === "assistant",
				"rounded-tl-xl user-message-gradient":
					message.role === "user",
			}
		);

		const nowTyping = message.typing && isLast;
		const wasTyping = message.typing && !isLast;

		if (wasTyping) return null;

		return (
			<section className={containerClass} ref={isLast ? ref : undefined}>
				<span className={itemClass}>
					{nowTyping ? (
						<ThreeDots
							height="20"
							width="20"
							radius="5"
							color="white"
							ariaLabel="three-dots-loading"
							visible={true}
						/>
					) : (
						<>
							<ReactMarkdown
								components={{
									code(props) {
										const { children } = props;
										return <code className="font-sans">{children}</code>;
									},
								}}
								className="[&>pre]:whitespace-pre-line"
								rehypePlugins={[rehypeSanitize]}
							>
								{message.message}
							</ReactMarkdown>
						</>
					)}
				</span>
			</section>
		);
	}
);

const Dialog: React.FC = () => {
	const [messages] = useAtom(messageAtom);
	const [{ totalDislikes, messenger, connected }, setConnection] =
		useAtom(connectionAtom);
	const [isEscalated, setIsEscalated] = useState(false);

	const { mutate: createFeedback } = useMutation({
		mutationKey: ["createFeedback"],
		mutationFn: (data: unknown) =>
			axios.post(`${import.meta.env.VITE_BASE_URL}/feedback`, data),
		onSuccess: () => {
			setConnection((prev) => ({
				...prev,
				totalDislikes: prev?.totalDislikes ? prev.totalDislikes + 1 : 1,
			}));
		},
	});

	if (!isEscalated && totalDislikes === 3) {
		setIsEscalated(true);
	}

	useEffect(() => {
		if (isEscalated) {
			setIsEscalated(false);
			messenger?.call({
				action: "prompt",
				adhoc: "escalate-level-1",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEscalated]);

	const lastMessageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="flex flex-1 flex-col gap-y-4 md:gap-y-8 p-3 md:px-6 h-full overflow-y-scroll scrollbar-hide">
			{messages.map((message, index, arr) => (
				<Message
					key={index}
					message={message}
					isFirst={index === 0}
					isLast={index === arr.length - 1}
					isConnected={connected}
					createFeedback={createFeedback}
					ref={lastMessageRef}
				/>
			))}
		</div>
	);
};

export default Dialog;
