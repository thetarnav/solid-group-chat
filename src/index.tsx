import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import '@/services/supabase'

render(() => <App />, document.getElementById('root') as HTMLElement)
