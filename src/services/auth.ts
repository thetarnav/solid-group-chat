import { Session } from '@supabase/supabase-js'
import { auth } from './supabase'
import { createStore } from 'solid-js/store'

const [authState, setAuthState] = createStore({
	session: null as null | Session,
	email: null as null | string,
	user: null as null | string,
})

export const signIn = async (): Promise<void> => {
	try {
		const { error } = await auth.signIn({
			provider: 'github',
		})
		if (error) throw error
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

auth.onAuthStateChange((event, session) => {
	if (event === 'SIGNED_IN' && session && session.user)
		setAuthState({
			session,
			email: session.user.email ?? '',
			user: session.user.user_metadata.user_name ?? '',
		})
	else if (event === 'SIGNED_OUT' || event === 'USER_DELETED')
		setAuthState({
			session: null,
			email: null,
			user: null,
		})
})
