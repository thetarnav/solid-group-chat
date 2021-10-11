interface Toast {
	text: string
}

// Universal function
function createToaster() {
	const [toasts, setToasts] = createSignal<Toast[]>([])

	const addToast = (toast: Toast): readonly Toast[] => {
		setToasts(list => [...list, toast])
		return toasts()
	}

	const removeToast = (toast: Toast): readonly Toast[] => {
		setToasts(list => list.filter(item => item !== toast))
		return toasts()
	}

	function showToast(text: string): void {
		const toast = { text }
		addToast(toast)
		setTimeout(() => removeToast(toast), 1600)
	}

	const messages = createMemo<string[]>(() =>
		toasts().map(toast => toast.text),
	)

	return {
		showToast,
		messages,
	}
}

// Created and exported immediately as a store
export const { showToast, messages } = createToaster()
