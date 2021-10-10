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

const findByUuid = (chats: ChatItem[], uuid: string): ChatItem | undefined =>
	chats.find(chat => chat.uuid === uuid)

export const getChat = (
	group: 'own' | 'joined',
	uuid: string,
): ChatItem | undefined => findByUuid(state[group], uuid)

export const editChat = (
	group: 'own' | 'joined',
	uuid: string,
	modify: (chat: ChatItem) => void,
): void => {
	setState(
		group,
		produce<ChatItem[]>(chats => {
			const chat = findByUuid(chats, uuid)
			chat && modify(chat)
		}),
	)
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
	getChat: typeof getChat
	editChat: typeof editChat
} {
	getChats().then(chats => setState(chats))
	// fetchJoinedChats().then(chats => setState('joinedChats', chats))

	return {
		state,
		createChat,
		removeChat,
		getChat,
		editChat,
	}
}
