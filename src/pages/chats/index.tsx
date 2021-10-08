import { useAuthGuard } from '@/router'
import { Component } from 'solid-js'

const ChatsPage: Component = () => {
	if (!useAuthGuard()) return
	return <div>chats</div>
}

export default ChatsPage
