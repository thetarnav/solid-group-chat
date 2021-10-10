import { Icon } from '@amoutonbrady/solid-heroicons'
import { pencil } from '@amoutonbrady/solid-heroicons/solid'

import styles from './Chats.module.css'

const ChatCard: Component<{
	uuid: string
	name: string
	members: number
	delete?: (uuid: string) => void
	onEdit?: (uuid: string) => void
}> = props => {
	return (
		<div class={styles.ChatItem}>
			<div class="id">{props.uuid}</div>
			<div class="body">
				<div class="content">
					<h3 onclick={() => props.onEdit?.(props.uuid)}>
						{props.name}
						<button>
							<Icon path={pencil} />
						</button>
					</h3>
					<p>Members: {props.members}</p>
				</div>
				<div class="footer">
					<div>
						<button
							class="delete"
							onclick={() => props.delete?.(props.uuid)}
						>
							Remove
						</button>
						<button class="join">Join</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatCard
