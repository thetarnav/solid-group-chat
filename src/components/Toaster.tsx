import { Toaster, Toast } from 'solid-headless'
import {
	animateMove,
	cssEnter,
	cssExit,
	TransitionGroup,
} from '@otonashixav/solid-flip'

const ToastComponent: Component<{
	message: string
}> = props => (
	<Toast class="bg-blue-600 bg-opacity-90 px-6 py-4 mt-3 rounded-lg flex justify-center items-center">
		<span class="text-sm font-semibold text-white">{props.message}</span>
	</Toast>
)

const ToasterController: Component<{
	messages: string[]
}> = props => (
	<Toaster class="fixed z-10 inset-x-0 bottom-6 h-0 flex justify-center">
		<div class="absolute bottom-0 flex flex-col-reverse justify-end items-center">
			<TransitionGroup
				enter={cssEnter({
					from: 'transform translate-y-8 opacity-0',
					active: 'transition-base',
				})}
				exit={cssExit({
					to: 'transform translate-y-8 opacity-0',
					active: 'transition-base',
				})}
				move={animateMove()}
			>
				<For each={props.messages}>
					{message => <ToastComponent message={message} />}
				</For>
			</TransitionGroup>
		</div>
	</Toaster>
)

export default ToasterController
