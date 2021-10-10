import { useAuthGuard } from '@/router'
import useChats from '@/stores/chats'

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

	const editTitle = (newTitle: string) => {
		const uuid = editing()
		if (uuid && newTitle)
			editChat('own', uuid, chat => {
				chat.name = newTitle
			})
		setEditing(undefined)
	}

	return (
		<div class={styles.Chats}>
			<h2 class="group-label">Your chats</h2>
			<div class="own-group">
				<For each={chats.own}>
					{chat => (
						<ChatCard
							uuid={chat.uuid}
							name={chat.name}
							members={chat.members}
							delete={uuid => removeChat('own', uuid)}
							onEdit={uuid => setEditing(uuid)}
						/>
					)}
				</For>
				<button class={styles.CreateNew} onclick={createChat}>
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
