import { render } from 'solid-js/web'
import { Router } from 'solid-app-router'

import './index.css'
import App from './App'
import '@/services/supabase'

render(
	() => (
		<Router>
			<App />
		</Router>
	),
	document.getElementById('root') as HTMLElement,
)
