import { Component, JSX } from 'solid-js'

import styles from './Button.module.css'

const Button: Component<{
	class?: string
	classList?: Record<string, boolean | undefined>
	type?: JSX.ButtonHTMLAttributes<HTMLButtonElement>['type']
	onClick?: () => void
}> = props => (
	<button
		class={`${styles.Button} ${props.class ?? ''}`}
		classList={props.classList ?? {}}
		type={props.type}
		onclick={props.onClick}
	>
		{props.children}
	</button>
)

export default Button
