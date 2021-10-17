import { useAuthGuard } from '@/router'
import useChatStore from '@/stores/chat'
import copy from 'copy-text-to-clipboard'
import { showToast } from '@/stores/toasts'

import styles from './Chat.module.css'

import { link, paperAirplane, x } from '@amoutonbrady/solid-heroicons/solid'

const ChatPage: Component = () => {
	if (!useAuthGuard()) return
	const navigate = useNavigate()
	const chatID = useParams().id
	const chatState = useChatStore(chatID)

	const copyLink = () => {
		copy(`${import.meta.env.VITE_BASE_URL}/chats/${chatID}`)
		showToast('Copied chatroom link!')
	}

	return (
		<Switch>
			<Match when={chatState.fetching && !chatState.details}>
				<div>Fetching chat data...</div>
			</Match>
			<Match when={!chatState.fetching && !chatState.details}>
				<div class="h-full w-full flex flex-col space-y-2 items-center justify-center">
					<p>Could't fetch the chat details...</p>
					<Button onclick={() => navigate('/chats')}>
						Go back to the dashboard
					</Button>
					<p>Or refresh and try again.</p>
				</div>
			</Match>
			<Match when={chatState.details}>
				{chat => (
					<div class={styles.Page}>
						<header class={styles.Header}>
							<h1>{chat.name}</h1>
							<Button
								kind="icon"
								color="gray"
								icon={link}
								onClick={copyLink}
							/>
							<Button
								kind="icon"
								color="gray"
								icon={x}
								onclick={() => navigate('/chats')}
							/>
						</header>
						<div class={styles.Body}>
							<For
								each={chat.messages}
								fallback={<p>No messages in this chat</p>}
							>
								{message => (
									<div>
										<p>{message.from}</p>
										<p>{message.content}</p>
									</div>
								)}
							</For>
						</div>
						<div class={styles.Input}>
							<input type="text" />
							<Button kind="icon" icon={paperAirplane} />
						</div>
					</div>
				)}
			</Match>
		</Switch>
	)
}

export default ChatPage
