import { fetchChatItems } from '@/services/db'
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
	return userID ? await fetchChatItems(userID) : { own: [], joined: [] }
}

export default function useChats(): {
	state: State
} {
	getChats().then(chats => setState(chats))
	// fetchJoinedChats().then(chats => setState('joinedChats', chats))

	return {
		state,
	}
}
