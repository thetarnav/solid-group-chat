import { Component, createEffect, on } from 'solid-js'
import { useNavigate, useRoutes } from 'solid-app-router'
import Nav from './components/Nav'

import styles from './App.module.css'
import { routes } from './router'
import { isLoggedIn } from './services/auth'

const App: Component = () => {
	const Routes = useRoutes(routes)
	const navigate = useNavigate()

	createEffect(
		on(isLoggedIn, loggedIn => {
			loggedIn
				? navigate('/chats', { replace: true })
				: navigate('/hello', { replace: true })
		}),
	)

	return (
		<div class={styles.App}>
			<Nav class={styles.Nav} />
			<main>
				<Routes />
			</main>
		</div>
	)
}

export default App
