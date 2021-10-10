import { chatsDB, usersDB } from '@/services/supabase'
import { ChatItem } from '@/types/chats'
import { definitions } from '@/types/supabase'

export const insertUser = (
	uuid: string,
	username?: string | null,
	avatar?: string | null,
): void => {
	usersDB().insert([
		{
			uuid,
			username: username ?? undefined,
			avatar: avatar ?? undefined,
		},
	])
}

export const fetchChatItem = async (uuid: string): Promise<ChatItem> => {
	const { data, error } = await chatsDB()
		.select('created_at,members,name,owner,uuid')
		.eq('uuid', uuid)

	if (error) throw error
	if (!data || !data.length) throw 'query unsuccessful'

	return mapChatItem(data[0])
}

export const fetchChatItems = async (
	uuid: string,
): Promise<{ own: ChatItem[]; joined: ChatItem[] }> => {
	const { data, error } = await chatsDB()
		.select('created_at,members,name,owner,uuid')
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
	uuid: data.uuid,
	created: data.created_at ? Date.parse(data.created_at) : Date.now(),
	members: data.members.length,
	name: data.name,
})

export const createChat = async (userID: string): Promise<ChatItem> => {
	const { data, error } = await chatsDB().insert(
		[
			{
				owner: userID,
				members: [userID],
				messages: [],
			},
		],
		{ returning: undefined },
	)
	if (error) throw error
	if (!data || !data.length) throw 'insert unsuccessful'

	return mapChatItem(data[0])
}

export const removeChat = async (uuid: string): Promise<void> => {
	const { data, error } = await chatsDB().delete().match({ uuid })
	console.log('deleted', data?.[0])

	if (error) throw error
	if (!data || !data.length) throw 'delete unsuccessful'
}
