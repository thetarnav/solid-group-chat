import { Session, User } from '@supabase/supabase-js'
import { auth } from '../services/supabase'
import { insertUser } from '@/services/db'
import { setUserInfo } from './users'

export const [authState, setAuthState] = createStore({
	email: undefined as undefined | string,
	username: undefined as undefined | string,
	uuid: undefined as undefined | string,
	avatar: undefined as undefined | string,
})

export const uuid = (): string | undefined => authState.uuid
export const username = (): string | undefined => authState.username
export const avatar = (): string | undefined => authState.avatar
export const isLoggedIn = (): boolean => !!authState.uuid

export const signIn = async (): Promise<void> => {
	const { error } = await auth.signIn(
		{
			provider: 'github',
		},
		import.meta.env.DEV ? { redirectTo: 'http://localhost:3000' } : undefined,
	)
	// eslint-disable-next-line no-console
	if (error) console.error(error)
}

export const signOut = (): void => {
	auth.signOut()
}

const setUser = (user: User | null) => {
	if (!user) {
		setAuthState({
			email: undefined,
			username: undefined,
			uuid: undefined,
			avatar: undefined,
		})
		return
	}
	const uuid = user.id,
		username: string | undefined = user.user_metadata.user_name ?? undefined,
		avatar: string | undefined = user.user_metadata.avatar_url ?? undefined
	setAuthState({
		email: user.email ?? undefined,
		username,
		uuid,
		avatar,
	})
	insertUser(uuid, username, avatar)
	setUserInfo(uuid, username, avatar)
}

setUser(auth.user())

auth.onAuthStateChange((event, session) => {
	if (event === 'SIGNED_IN' && session?.user) setUser(session.user)
	else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') setUser(null)
})
