import { Component } from 'solid-js'
import { signIn } from '@/services/auth'
import Button from '@/components/Button'

import styles from './hello.module.css'

const HelloPage: Component = () => (
	<div class={styles.Hello}>
		<h1>
			Welcome to the <span>Solid Group Chat</span>
		</h1>
		<p class="mt-8">Login to create and join chats.</p>
		<Button class="mt-2" onClick={signIn}>
			Login with Github
		</Button>
	</div>
)

export default HelloPage
