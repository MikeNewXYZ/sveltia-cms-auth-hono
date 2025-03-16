"use client";

import { useEffect } from "react";
import Script from "next/script";

const AdminPage = () => {
	useEffect(() => {
		window.CMS_MANUAL_INIT = true;
	}, []);

	const initCMS = () => {
		const { initCMS: init } = window;

		init({
			config: {
				backend: {
					name: "github",
					branch: "main",
					repo: "MikeNewXYZ/sveltia-cms-auth-hono",
					base_url:
						process.env.NODE_ENV === "development"
							? "http://localhost:3000"
							: process.env.VERCEL_URL,
					auth_endpoint: "api/auth",
				},
				media_folder: "sandbox/nextjs-edge/src/assets/",
				public_folder: "sandbox/nextjs-edge/src/assets/",
				collections: [
					{
						label: "Blogs",
						name: "blogs",
						folder: "sandbox/nextjs-edge/src/content/blogs",
						create: true,
						identifier_field: "title",
						slug: "{{slug}}",
						fields: [
							{ label: "Title", name: "title", widget: "string" },
							{ label: "Date", name: "date", widget: "datetime" },
							{ label: "Body", name: "body", widget: "markdown" },
						],
					},
				],
			},
		});
	};

	return (
		<Script
			src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"
			onLoad={initCMS}
			onError={() => console.error("Failed to load CMS script")}
		/>
	);
};

export default AdminPage;
