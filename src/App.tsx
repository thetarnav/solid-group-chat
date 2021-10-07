import type { Component } from 'solid-js'

import styles from './App.module.css'
import { signIn } from './services/auth'

const App: Component = () => {
	const x = ''

	return (
		<div class={styles.App}>
			<button onclick={signIn}>Login with github</button>
		</div>
	)
}

export default App
