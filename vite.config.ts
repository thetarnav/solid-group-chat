import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { ViteAliases } from 'vite-aliases'

export default defineConfig({
	plugins: [solidPlugin(), ViteAliases()],
	build: {
		target: 'esnext',
		polyfillDynamicImport: false,
	},
})
