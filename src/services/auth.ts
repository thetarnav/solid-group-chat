import { Session } from '@supabase/supabase-js'
import { auth } from './supabase'
import { createStore } from 'solid-js/store'

export const [authState, setAuthState] = createStore({
	session: null as null | Session,
	email: null as null | string,
	user: null as null | string,
	isLoggedIn: false,
})

export const username = (): string | null => authState.user
export const isLoggedIn = (): boolean => authState.isLoggedIn

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
	if (event === 'SIGNED_IN' && session && session.user)
		setAuthState({
			session,
			email: session.user.email ?? '',
			user: session.user.user_metadata.user_name ?? '',
			isLoggedIn: true,
		})
	else if (event === 'SIGNED_OUT' || event === 'USER_DELETED')
		setAuthState({
			session: null,
			email: null,
			user: null,
			isLoggedIn: false,
		})
})
