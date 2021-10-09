import { chatsDB, usersDB } from '@/services/supabase'
import { ChatItem } from '@/types/chats'
import { definitions } from '@/types/supabase'

export const insertUser = (
	uuid: string,
	username?: string | null,
	avatar?: string | null,
): void => {
	usersDB.insert([
		{
			uuid,
			username: username ?? undefined,
			avatar: avatar ?? undefined,
		},
	])
}

export const fetchChatItems = async (
	uuid: string,
): Promise<{ own: ChatItem[]; joined: ChatItem[] }> => {
	const { data, error } = await chatsDB
		.select('id,created_at,members,name,owner')
		.contains('members', [uuid])

	if (error) throw error
	if (!data) throw 'query unsuccessful'

	return data.reduce(
		(dict, chat) => {
			const isOwn = chat.owner === uuid
			return {
				own: isOwn ? [...dict.own, mapChatItem(chat)] : dict.own,
				joined: isOwn ? dict.joined : [...dict.joined, mapChatItem(chat)],
			}
		},
		{
			own: [] as ChatItem[],
			joined: [] as ChatItem[],
		},
	)
}

const mapChatItem = (data: definitions['chats']): ChatItem => ({
	chatID: data.id,
	created: data.created_at ? Date.parse(data.created_at) : Date.now(),
	members: data.members.length,
	name: data.name,
})
