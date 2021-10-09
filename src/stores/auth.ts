import { Session } from '@supabase/supabase-js'
import { auth } from '../services/supabase'
import { insertUser } from '@/services/db'

export const [authState, setAuthState] = createStore({
	session: null as null | Session,
	email: null as null | string,
	username: null as null | string,
	uuid: null as null | string,
	avatar: null as null | string,
})

export const uuid = (): string | null => authState.uuid
export const username = (): string | null => authState.username
export const avatar = (): string | null => authState.avatar
export const isLoggedIn = (): boolean => !!authState.uuid

export const signIn = async (): Promise<void> => {
	const { error } = await auth.signIn({
		provider: 'github',
	})
	// eslint-disable-next-line no-console
	if (error) console.error(error)
}

export const signOut = (): void => {
	auth.signOut()
}

auth.onAuthStateChange((event, session) => {
	if (event === 'SIGNED_IN' && session && session.user) {
		setAuthState({
			session,
			email: session.user.email ?? null,
			username: session.user.user_metadata.user_name ?? null,
			uuid: session.user.id,
			avatar: session.user.user_metadata.avatar_url ?? null,
		})
		insertUser(session.user.id, username(), avatar())
	} else if (event === 'SIGNED_OUT' || event === 'USER_DELETED')
		setAuthState({
			session: null,
			email: null,
			username: null,
			uuid: null,
			avatar: null,
		})
})
