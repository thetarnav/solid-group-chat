import { fetchChatDetails } from '@/services/db'
import { definitions } from '@/types/supabase'

type ChatState = Pick<definitions['chats'], 'name' | 'messages' | 'uuid'>

export default function useChatStore(uuid: string) {
	const [state, setState] = createStore<{
		fetching: boolean
		details: ChatState | null
	}>({
		fetching: true,
		details: null,
	})

	fetchChatDetails(uuid)
		.then(details => {
			setState({
				fetching: false,
				details,
			})
		})
		.catch(error => {
			setState({ fetching: false })
			// eslint-disable-next-line no-console
			console.error(error)
		})

	return state
}
