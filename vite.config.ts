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
						// reactivity
						'createEffect',
						'createSignal',
						'createComputed',
						'createMemo',
						'on',
						// components
						'Suspense',
						'For',
						'Show',
					],
					'solid-js/store': ['createStore'],
					'solid-app-router': ['useNavigate', 'useParams', 'useData'],
				},
			],
		}),
	],
	build: {
		target: 'esnext',
		polyfillDynamicImport: false,
	},
})
