import { useAuthGuard } from '@/router'
import useChats from '@/stores/chats'

import styles from './Chats.module.css'

import ChatCard from './ChatItem'

const ChatsPage: Component = () => {
	if (!useAuthGuard()) return

	const { state: chats, createChat } = useChats()

	return (
		<div class={styles.Chats}>
			<h2 class="group-label">Your chats</h2>
			<div class="own-group">
				<For each={chats.own}>
					{chat => (
						<ChatCard
							id={chat.uuid}
							name={chat.name}
							members={chat.members}
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
							id={chat.uuid}
							name={chat.name}
							members={chat.members}
						/>
					)}
				</For>
			</div>
		</div>
	)
}

export default ChatsPage