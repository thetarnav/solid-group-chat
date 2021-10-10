import * as db from '@/services/db'
import { dropWhile } from 'lodash'
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
		setState('own', chats => [...chats, chat])
		return chat
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const removeChat = async (
	group: 'own' | 'joined',
	uuid: string,
): Promise<void> => {
	console.log('remove', group, uuid)

	if (group === 'own') {
		try {
			await db.removeChat(uuid)
		} catch (error) {
			console.error(error)
			return
		}
	}
	setState(group, chats => chats.filter(chat => chat.uuid !== uuid))
}

export default function useChats(): {
	state: State
	createChat: typeof createChat
	removeChat: typeof removeChat
} {
	getChats().then(chats => setState(chats))
	// fetchJoinedChats().then(chats => setState('joinedChats', chats))

	return {
		state,
		createChat,
		removeChat,
	}
}
