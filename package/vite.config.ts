import { defineConfig } from "vite";
import vitePluginDts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		lib: {
			entry: {
				index: "./src/index.ts",
			},
			formats: ["es", "cjs"],
			fileName: (format, name) => `${format}/${name}.${format === "es" ? "mjs" : "cjs"}`,
		},
		rollupOptions: {
			external: ["hono"],
		},
		minify: true,
		sourcemap: true,
	},
	plugins: [
		tsconfigPaths(),
		vitePluginDts({
			entryRoot: "./src",
			outDir: "./dist/types",
			tsconfigPath: "./tsconfig.json",
		}),
	],
});
