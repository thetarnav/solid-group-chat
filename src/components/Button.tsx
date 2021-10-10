import { JSX } from 'solid-js'
import { Icon } from '@amoutonbrady/solid-heroicons'

import styles from './Button.module.css'

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	iconLeft?: {
		path: string
		outline: boolean
	}
	iconRight?: {
		path: string
		outline: boolean
	}
	icon?: {
		path: string
		outline: boolean
	}
}

const Button: Component<Props> = props => {
	const [, external] = splitProps(props, ['iconLeft', 'iconRight', 'class'])

	return (
		<button {...external} class={`${styles.Button} ${props.class ?? ''}`}>
			{props.icon ? (
				<Icon path={props.icon} />
			) : (
				<>
					<Show when={props.iconLeft}>
						<Icon path={props.iconLeft as any} class="left" />
					</Show>
					{props.children}
					<Show when={props.iconRight}>
						<Icon path={props.iconRight as any} class="right" />
					</Show>
				</>
			)}
		</button>
	)
}

export default Button
