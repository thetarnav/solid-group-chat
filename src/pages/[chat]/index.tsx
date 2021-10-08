import { useAuthGuard } from '@/router'
import { useNavigate, useParams } from 'solid-app-router'
import { Component } from 'solid-js'

const ChatPage: Component = () => {
	if (!useAuthGuard()) return
	const params = useParams()
	const navigate = useNavigate()

	return <div>chat {params.id}</div>
}

export default ChatPage
