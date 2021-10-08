import { chatsDB, usersDB } from '@/services/supabase'

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

export const getOwnChats = async (
	uuid: string,
): Promise<
	{
		chatID: number
		created: number
		members: number
	}[]
> => {
	const { data, error } = await chatsDB
		.select('id,created_at,members')
		.eq('owner', uuid)

	if (error) throw error
	if (!data) throw 'query unsuccessful'

	return data.map(chat => ({
		chatID: chat.id,
		created: chat.created_at ? Date.parse(chat.created_at) : Date.now(),
		members: chat.members.length,
	}))
}
