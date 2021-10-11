// eslint-disable-next-line @typescript-eslint/ban-types
declare type Component<P = {}> = import('solid-js').Component<P>

interface UserInfo {
	readonly username?: string
	readonly avatar?: string
}
interface ChatItem {
	name: string
	uuid: string
	created: number
	members: string[]
}
