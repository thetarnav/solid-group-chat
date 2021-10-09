import { useAuthGuard } from '@/router'
import useChats from '@/stores/chats'

import styles from './Chats.module.css'

const ChatsPage: Component = () => {
	if (!useAuthGuard()) return

	const { state: chats } = useChats()

	return (
		<div class={styles.Chats}>
			<For each={chats.own}>
				{chat => (
					<div>
						<h3>{chat.name}</h3>
						<p>{chat.chatID}</p>
						<p>{chat.created}</p>
						<p>{chat.members}</p>
					</div>
				)}
			</For>
			<For each={chats.joined}>
				{chat => (
					<div>
						<h3>{chat.name}</h3>
						<p>{chat.chatID}</p>
						<p>{chat.created}</p>
						<p>{chat.members}</p>
					</div>
				)}
			</For>
		</div>
	)
}

export default ChatsPage
