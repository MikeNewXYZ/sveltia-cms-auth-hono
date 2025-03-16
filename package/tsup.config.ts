import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "types/index.ts", "src/platforms/*.ts"],
	tsconfig: "tsconfig.json",
	format: ["esm"],
	dts: true,
	bundle: true,
	clean: true,
	splitting: true,
});
