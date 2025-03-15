import { Hono } from "hono";
import { handle as handleVercel } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export { app as SveltiaCMSAuthApp, handleVercel };
