import { fetchUser } from '@/services/db'

const [users, setUsers] = createStore<Record<string, UserInfo>>({})
const alreadyFetched: string[] = []

export const fetchUserInfo = async (uuid: string): Promise<void> => {
	if (alreadyFetched.includes(uuid)) return
	alreadyFetched.push(uuid)

	try {
		const { avatar, username } = await fetchUser(uuid)
		setUserInfo(uuid, username, avatar)
	} catch (error) {
		console.log(`fetching user ${uuid} failed:`, error)
	}
}

export const setUserInfo = (
	uuid: string,
	username?: string,
	avatar?: string,
): void => setUsers(uuid, { username, avatar })

export const getUserInfo = (uuid: string): UserInfo | undefined => {
	const info = users[uuid]
	fetchUserInfo(uuid)
	return info
}
