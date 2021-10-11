declare type Component<P = Record<string, never>> =
	import('solid-js').Component<P>

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
