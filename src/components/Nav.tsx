import { isLoggedIn, signOut, username } from '@/stores/auth'
import { Component, Show } from 'solid-js'
import Button from './Button'

import styles from './Nav.module.css'

const Nav: Component<{ class?: string }> = props => (
	<nav class={`${styles.Nav} ${props.class}`}>
		<div class={styles.Logo}>
			<h1>Solid Group Chat</h1>
		</div>
		<div class={styles.User}>
			<Show when={isLoggedIn()}>
				<div class="username">hello, {username()}</div>
				<Button onClick={signOut}>Logout</Button>
			</Show>
		</div>
	</nav>
)

export default Nav
