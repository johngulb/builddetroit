export interface ChatRoomMessage {
	commentable_id: number;
	user_id: number;
	text: string;
	message_sent_time: string;
}

export const mockChatData: ChatRoomMessage[] = [
	{
		commentable_id: 1,
		user_id: 1,
		text: 'Hello, how are you?',
		message_sent_time: '2023-03-02T01:32:27.203Z',
	},
	{
		commentable_id: 2,
		user_id: 2,
		text: "I'm good, thanks! And you?",
		message_sent_time: '2023-03-02T01:36:27.203Z',
	},
	{
		commentable_id: 3,
		user_id: 3,
		text: 'Doing well, thanks for asking.',
		message_sent_time: '2023-03-02T02:32:27.203Z',
	},
	{
		commentable_id: 4,
		user_id: 4,
		text: "Hey guys, what's up?",
		message_sent_time: '2023-03-02T02:32:27.203Z',
	},
	{
		commentable_id: 5,
		user_id: 1,
		text: 'Not much, just hanging out.',
		message_sent_time: '2023-03-02T02:32:27.203Z',
	},
	{
		commentable_id: 6,
		user_id: 2,
		text: 'Same here.',
		message_sent_time: '2023-03-02T02:32:27.203Z',
	},
	{
		commentable_id: 7,
		user_id: 5,
		text: "Hey everyone, how's it going?",
		message_sent_time: '2023-03-02T02:32:27.203Z',
	},
	{
		"commentable_id": 8,
		"user_id": 6,
		"text": "Good morning, folks!",
		"message_sent_time": "2023-03-02T03:32:27.203Z"
	},
	{
		"commentable_id": 9,
		"user_id": 7,
		"text": "Hey, how's your day going?",
		"message_sent_time": "2023-03-02T04:32:27.203Z"
	},
	{
		"commentable_id": 10,
		"user_id": 8,
		"text": "Not bad, thanks! Just working on some code.",
		"message_sent_time": "2023-03-02T05:32:27.203Z"
	},
	{
		"commentable_id": 11,
		"user_id": 9,
		"text": "Hey guys, anyone want to grab lunch later?",
		"message_sent_time": "2023-03-02T06:32:27.203Z"
	},
	{
		"commentable_id": 12,
		"user_id": 1,
		"text": "I'm down for lunch!",
		"message_sent_time": "2023-03-02T07:32:27.203Z"
	},
];
