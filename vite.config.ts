import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { ViteAliases } from 'vite-aliases'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
	plugins: [
		solidPlugin(),
		ViteAliases(),
		AutoImport({
			imports: [
				{
					'solid-js': [
						// lifecycle
						'onMount',
						'onCleanup',
						// reactivity
						'createEffect',
						'createSignal',
						'createComputed',
						'createMemo',
						'on',
						'untrack',
						// utils
						'createRoot',
						'splitProps',
						'lazy',
						// components
						'Suspense',
						'For',
						'Show',
						'Switch',
						'Match',
					],
					'solid-js/store': ['createStore', 'produce'],
					'solid-app-router': ['useNavigate', 'useParams', 'useData'],
					'@/components': ['Button', 'Toaster'],
					'@amoutonbrady/solid-heroicons': ['Icon'],
				},
			],
		}),
	],
	build: {
		target: 'esnext',
		polyfillDynamicImport: false,
	},
})
