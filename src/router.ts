import { RouteDefinition } from 'solid-app-router'
import { isLoggedIn } from './stores/auth'

export const routes: RouteDefinition[] = [
	{
		path: '/chats',
		component: lazy(() => import('./pages/chats')),
	},
	{
		path: '/chats/:id',
		component: lazy(() => import('./pages/[chat]')),
	},
	{
		path: '/',
		component: lazy(() => import('./pages/hello')),
	},
	{
		path: '/*all',
		component: lazy(() => import('./pages/hello')),
	},
]

export const useAuthGuard = (): boolean => {
	const navigate = useNavigate()
	const authenticated = isLoggedIn()

	if (!authenticated) navigate('/hello', { replace: true })

	return authenticated
}
