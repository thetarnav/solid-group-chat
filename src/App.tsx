import { useRoutes } from 'solid-app-router'
import { routes } from './router'
import { isLoggedIn } from './stores/auth'
import { messages } from './stores/toasts'

import styles from './App.module.css'

import Nav from './components/Nav'
import ToasterController from './components/Toaster'

const App: Component = () => {
	const Routes = useRoutes(routes)
	const navigate = useNavigate()

	createEffect(
		on(isLoggedIn, loggedIn => {
			if (loggedIn) {
				// remove logged users form the hello page
				;['/', '/hello'].includes(window.location.pathname) &&
					navigate('/chats', { replace: true })
			} else {
				// guard access to restricted pages for NOT logged-in users
				window.location.pathname.includes('/chats') &&
					navigate('/hello', { replace: true })
			}
		}),
	)

	return (
		<div class={styles.App}>
			<Nav class={styles.Nav} />
			<ToasterController messages={messages()} />
			<main>
				<Suspense fallback={<p>Loading...</p>}>
					<Routes />
				</Suspense>
			</main>
		</div>
	)
}

export default App
