import * as db from '@/services/db'
import { ChatItem } from '@/types/chats'
import { uuid } from './auth'

interface State {
	own: ChatItem[]
	joined: ChatItem[]
}

export const [state, setState] = createStore<State>({
	own: [],
	joined: [],
})

export const getChats = async (): Promise<{
	own: ChatItem[]
	joined: ChatItem[]
}> => {
	const userID = uuid()
	return userID ? await db.fetchChatItems(userID) : { own: [], joined: [] }
}

export const createChat = async (): Promise<ChatItem> => {
	const userID = uuid()
	if (!userID) throw 'no user uuid'
	try {
		const chat = await db.createChat(userID)
		console.log(chat)
		setState('own', chats => [...chats, chat])
		return chat
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default function useChats(): {
	state: State
	createChat: () => Promise<ChatItem>
} {
	getChats().then(chats => setState(chats))
	// fetchJoinedChats().then(chats => setState('joinedChats', chats))

	return {
		state,
		createChat,
	}
}
