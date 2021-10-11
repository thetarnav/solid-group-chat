import { Session } from '@supabase/supabase-js'
import { auth } from '../services/supabase'
import { insertUser } from '@/services/db'
import { setUserInfo } from './users'

export const [authState, setAuthState] = createStore({
	session: undefined as undefined | Session,
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

auth.onAuthStateChange((event, session) => {
	if (event === 'SIGNED_IN' && session && session.user) {
		const uuid = session.user.id,
			username: string | undefined =
				session.user.user_metadata.user_name ?? undefined,
			avatar: string | undefined =
				session.user.user_metadata.avatar_url ?? undefined
		setAuthState({
			session,
			email: session.user.email ?? undefined,
			username,
			uuid,
			avatar,
		})
		insertUser(uuid, username, avatar)
		setUserInfo(uuid, username, avatar)
	} else if (event === 'SIGNED_OUT' || event === 'USER_DELETED')
		setAuthState({
			session: undefined,
			email: undefined,
			username: undefined,
			uuid: undefined,
			avatar: undefined,
		})
})
