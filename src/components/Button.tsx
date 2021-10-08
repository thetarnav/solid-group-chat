import { Component } from 'solid-js'

import styles from './Button.module.css'

const Button: Component<{
	class?: string
	classList?: Record<string, boolean | undefined>
	onClick?: () => void
}> = props => (
	<button
		class={`${styles.Button} ${props.class ?? ''}`}
		classList={props.classList ?? {}}
		onclick={props.onClick}
	>
		{props.children}
	</button>
)

export default Button
