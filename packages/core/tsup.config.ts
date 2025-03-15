import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/platforms/*.ts"],
	tsconfig: "tsconfig.json",
	format: ["esm"],
	dts: true,
	bundle: false,
	clean: true,
	splitting: true,
});
