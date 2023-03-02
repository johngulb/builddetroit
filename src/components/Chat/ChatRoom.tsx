import React from 'react';
import styled from '@emotion/styled';
import { ChatRoomMessage } from './mockChatData';
import SendIcon from '@mui/icons-material/Send';
// import { DateTime } from 'luxon';
import { DPoPEventCheckIn } from '../../dpop';
// import axios from 'axios';

interface ChatRoomProps {
	checkIn: DPoPEventCheckIn;
	initialMessages: ChatRoomMessage[];
}

// https://api.dpop.tech/api/event/{event_id}/comment
// https://api.dpop.tech/api/event/{event_id}/comments
// https://api.dpop.tech/api/event/bagaaieraokagwwfa4qectjxdnkanh5h5bm7sbqw3d63usaz46q6m4ph2y4ba/comments

export const ChatRoom: React.FC<React.PropsWithChildren<ChatRoomProps>> = ({
	checkIn,
	initialMessages,
}) => {
	const [messages, setMessages] = React.useState<ChatRoomMessage[]>(
		initialMessages ?? []
	);
	const [newMessageText, setNewMessageText] = React.useState<string | null>('');
	const messageListRef = React.useRef<HTMLUListElement>(null);

	const handleScrollToBottomOfMessageList = () => {
		messageListRef.current.scrollTo(0, messageListRef.current.scrollHeight);
	};

	React.useEffect(() => handleScrollToBottomOfMessageList(), []);

	const handleSendCommentRequest = async (newMessage: ChatRoomMessage) => {
		fetch(
			`https://api.dpop.tech/api/event/1188/comment`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ text: newMessage.text }),
			}
		)
        .then((res) => res.json())
		.then((data) => {
			console.log('handleSendComment', data, newMessage);
		});
	};

	const handleSendMessage = () => {
		if (
			!newMessageText ||
			(typeof newMessageText === 'string' && newMessageText.trim() === '')
		)
			return;
		const dateCreated = new Date().toISOString();
		const newMessage: any = {
			text: newMessageText,
			message_sent_time: dateCreated,
		};
		handleSendCommentRequest(newMessage);
		setMessages([...messages, newMessage]);
		setNewMessageText('');
		handleScrollToBottomOfMessageList();
	};

	const handleOnChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMessageText(e.target.value);
	};

	const handleOnKeyPressNewMessage = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<ChatRoomWrapper>
			<h3>Chat Room</h3>
			<div className='chat-room-container'>
				<div className='message-list-container'>
					<ul className='message-list' ref={messageListRef}>
						{messages.map((message) => {
							const isCurrentUser = message.user_id === checkIn.user.id;
							// const dateCreated = DateTime.fromISO(
							// 	message.message_sent_time
							// ).toRelative();
							const className = `message-list-item ${
								isCurrentUser ? 'current-user' : ''
							}`.trim();
							return (
								<li className={className} key={message.commentable_id}>
									{/* <span className='message-list-item-message-timestamp'>
										{dateCreated}
									</span> */}
									<div className='message-list-item-message-text'>
										{message.text}
									</div>
								</li>
							);
						})}
					</ul>
				</div>
				<div className='message-input-wrapper'>
					<input
						placeholder='Send message'
						value={newMessageText}
						onChange={handleOnChangeNewMessage}
						onKeyUp={handleOnKeyPressNewMessage}
					/>
					<button onClick={handleSendMessage}>
						<SendIcon className='send-icon' />
					</button>
				</div>
			</div>
		</ChatRoomWrapper>
	);
};

// #1e262e
// #252c34
// #51b56d

const ChatRoomWrapper = styled.div`
	.chat-room-container {
        background-color: #1e262e;
		background-color: #29303d;
		padding: 10px;
		border-radius: 5px;
	}
	.message-list-container {
		.message-list {
			list-style-type: none;
			margin-left: 0;
			font-size: 14px;
			display: flex;
			flex-direction: column;
			overflow-y: auto;
			max-height: 400px;

			.message-list-item {
				margin-bottom: 10px;
				flex-direction: column;
				display: flex;

				&.current-user {
					.message-list-item-message-text {
						background-color: #e8f384;
					}
				}
			}

			.message-list-item-message-text {
				padding: 5px;
				border-radius: 5px;
                background-color: #373a3e;
				background-color: #3c4351;
                color: #ffffff;
			}

			.message-list-item-message-timestamp {
				color: #ffffff;
				align-self: flex-end;
				font-size: 12px;
			}
		}
	}
	.message-input-wrapper {
		display: flex;
		width: 100%;
		margin-top: 10px;

		input {
			width: 100%;
			border: 1px solid #000;
			color: #4b4b4b;
			background-color: #fff;
			border-radius: 5px;
			resize: none;
			height: 35px;
			font-size: 15px;
			padding: 0 5px;
		}

		button {
			border-radius: 5px;
			outline: none;
			border: none;
			margin-left: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			background-color: #8DA1B9;
            //background-color: #79BEA8;

            &:hover {
                background-color: #778aa1;
            }
			.send-icon {
				font-size: 20px;
			}
		}
	}
`;
