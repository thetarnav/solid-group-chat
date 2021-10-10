import { Icon } from '@amoutonbrady/solid-heroicons'
import {
	arrowRight,
	link,
	pencil,
	trash,
} from '@amoutonbrady/solid-heroicons/solid'

import styles from './Chats.module.css'
import Button from '@/components/Button'

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
						<Button
							class="delete"
							onClick={() => props.delete?.(props.uuid)}
							icon={trash}
						/>
						<Button
							class="share"
							onClick={() => props.delete?.(props.uuid)}
							icon={link}
						/>
						<Button class="join" iconRight={arrowRight}>
							Join
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatCard
