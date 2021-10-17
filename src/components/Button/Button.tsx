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
	kind?: 'default' | 'icon'
	color?: 'blue' | 'gray'
}

const Button: Component<Props> = props => {
	const [, external] = splitProps(props, [
		'iconLeft',
		'iconRight',
		'icon',
		'class',
		'kind',
		'color',
	])

	const classes = () =>
		[styles.Button, props.class, props.kind, props.color]
			.filter(c => c)
			.join(' ')

	return (
		<button {...external} class={classes()}>
			{props.icon ? (
				<Icon path={props.icon} />
			) : (
				<>
					<Show when={props.iconLeft}>
						{icon => <Icon path={icon} class="left-icon" />}
					</Show>
					{props.children}
					<Show when={props.iconRight}>
						{icon => <Icon path={icon} class="right-icon" />}
					</Show>
				</>
			)}
		</button>
	)
}

export default Button
