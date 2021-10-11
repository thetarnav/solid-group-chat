import { useAuthGuard } from '@/router'
import useChats from '@/stores/chats'
import { updateChatName } from '@/services/db'
import { showToast } from '@/stores/toasts'

import styles from './Chats.module.css'

import ChatCard from './ChatItem'
import InputModal from '@/components/InputModal'

const ChatsPage: Component = () => {
	if (!useAuthGuard()) return
	const {
		state: chats,
		createChat,
		removeChat,
		getChat,
		editChat,
	} = useChats()
	const [editing, setEditing] = createSignal<string>()

	const editTitle = (name: string) => {
		const uuid = editing()
		if (uuid && name) {
			name = name.slice(0, 35)
			editChat('own', uuid, chat => {
				chat.name = name
			})
			updateChatName(uuid, name)
			showToast('Chat successfully renamed.')
		}
		setEditing(undefined)
	}

	const remove = async (uuid: string) => {
		try {
			await removeChat('own', uuid)
			showToast('Chat removed forever...')
		} catch (error) {
			showToast("Couldn't remove chat. Please, reload and try again.")
		}
	}

	const create = async () => {
		try {
			await createChat()
			showToast('A new chatroom created.')
		} catch (error) {
			showToast("Couldn't create a new chat")
		}
	}

	return (
		<div class={styles.Chats}>
			<h2 class="group-label">Your chats</h2>
			<div class="own-group">
				<For each={chats.own}>
					{chat => (
						<ChatCard
							own={true}
							uuid={chat.uuid}
							name={chat.name}
							members={chat.members}
							delete={remove}
							onEdit={uuid => setEditing(uuid)}
						/>
					)}
				</For>
				<button class={styles.CreateNew} onclick={create}>
					Create new
				</button>
			</div>
			<h2 class="group-label">Joined chats</h2>
			<div class="joined-group">
				<For each={chats.joined}>
					{chat => (
						<ChatCard
							uuid={chat.uuid}
							name={chat.name}
							members={chat.members}
							delete={uuid => removeChat('joined', uuid)}
						/>
					)}
				</For>
			</div>
			<Show when={editing()}>
				<InputModal
					value={getChat('own', editing() as string)?.name ?? ''}
					onsubmit={v => editTitle(v)}
					onexit={() => setEditing(undefined)}
				/>
			</Show>
		</div>
	)
}

export default ChatsPage
