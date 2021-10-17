import styles from './InputModal.module.css'

const InputModal: Component<{
	value: string
	onsubmit?: (value: string) => void
	onexit?: (value: string) => void
	oninput?: (value: string) => void
}> = props => {
	const [value, setValue] = createSignal(props.value)

	const onSubmit = (e: Event) => {
		e.preventDefault()
		props.onsubmit?.(value())
	}
	const onInput = (v: string) => {
		setValue(v)
		props.oninput?.(v)
	}
	const exit = () => {
		props.onexit?.(value())
	}

	return (
		<div class={styles.wrapper}>
			<div class={styles.cover} onclick={exit}></div>
			<form class={styles.modal} onsubmit={onSubmit}>
				<label for="title">Edit chat's title:</label>
				<textarea
					name="title"
					rows="3"
					placeholder="Type title of your chat"
					value={value()}
					oninput={e => onInput(e.currentTarget.value)}
				></textarea>
				<div class="row">
					<Button type="button" onClick={exit}>
						Cancel
					</Button>
					<Button>Save</Button>
				</div>
			</form>
		</div>
	)
}

export default InputModal
