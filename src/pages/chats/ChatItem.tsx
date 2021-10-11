import { Icon } from '@amoutonbrady/solid-heroicons'
import {
	arrowRight,
	link,
	pencil,
	trash,
} from '@amoutonbrady/solid-heroicons/solid'
import { getUserInfo } from '@/stores/users'

import styles from './Chats.module.css'

import Button from '@/components/Button'
import { drop } from 'lodash'

const getUserAvatars = (
	uuids: string[],
	remaining: number,
	avatars: string[] = [],
): string[] => {
	if (!uuids.length || !remaining) return avatars
	const [uuid] = uuids
	const info = getUserInfo(uuid)
	const avatar = info?.avatar
	return avatar
		? getUserAvatars(drop(uuids), remaining - 1, [...avatars, avatar])
		: getUserAvatars(drop(uuids), remaining, avatars)
}

const ChatCard: Component<{
	uuid: string
	name: string
	members: string[]
	delete?: (uuid: string) => void
	onEdit?: (uuid: string) => void
}> = props => {
	const userAvatars = createMemo<string[]>(() =>
		getUserAvatars(props.members, 5),
	)

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
					<div class="members">
						<For each={userAvatars()}>
							{avatar => <img src={avatar} />}
						</For>
						<Show when={props.members.length - userAvatars().length > 0}>
							<div class="rest">
								+{props.members.length - userAvatars().length}
							</div>
						</Show>
					</div>
					{/* <p>Members: {props.members}</p> */}
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
