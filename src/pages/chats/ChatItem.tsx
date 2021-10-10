import styles from './Chats.module.css'

const ChatCard: Component<{
	id: string
	name: string
	members: number
}> = props => {
	return (
		<div class={styles.ChatItem}>
			<div class="id">{props.id}</div>
			<div class="body">
				<div class="content">
					<h3>{props.name}</h3>
					<p>Members: {props.members}</p>
				</div>
				<div class="footer">
					<div>
						<button class="delete">Remove</button>
						<button class="join">Join</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatCard
