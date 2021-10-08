import { getOwnChats } from '@/api/queries'
import { useAuthGuard } from '@/router'
import { uuid } from '@/services/auth'
import { Component } from 'solid-js'

import styles from './Chats.module.css'

const ChatsPage: Component = () => {
	if (!useAuthGuard()) return

	getOwnChats(uuid() ?? '')

	return <div class={styles.Chats}>chats</div>
}

export default ChatsPage
