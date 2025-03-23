**⚠️ Warning: Experimental Package - Not Suitable for Production Use**

# Sveltia CMS Auth Hono (unofficial)

Authentication library for Sveltia CMS that works across multiple environments (Edge, Cloudflare, Node.js).

## Installation

```bash
npm install sveltia-cms-auth-hono
```

```bash
pnpm add sveltia-cms-auth-hono
```

```bash
yarn add sveltia-cms-auth-hono
```

## Examples

### Astro with Cloudflare Adaptor

```typescript
// src/pages/api/[...route].ts
import type { APIRoute } from "astro";
import { createAuthApp } from "sveltia-cms-auth-hono";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = import.meta.env;

const app = createAuthApp({
  provider: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
});

export const ALL: APIRoute = (context) => app.fetch(context.request);
```

### Next.js with Edge Runtime

```bash
npm install hono
```

```typescript
// src/app/api/[[...route]]/route.ts
import { handle } from "hono/vercel";
import { createAuthApp } from "sveltia-cms-auth-hono";

export const runtime = "edge";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const app = createAuthApp({
  provider: {
    github: {
      clientId: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_CLIENT_SECRET as string,
    },
  },
});

export const GET = handle(app);
export const POST = handle(app);
```

### Node.js Server

```bash
npm install @hono/node-server
```

```javascript
// index.js
const { serve } = require("@hono/node-server");
const { createAuthApp } = require("sveltia-cms-auth-hono");

require("dotenv/config");

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const app = createAuthApp({
  provider: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  options: { baseURL: "/" },
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
```

## Configuration Options

The **createAuthApp** function accepts the following configuration.

| Options                      | Type             | Description                                | Required |
| :--------------------------- | :--------------- | :----------------------------------------- | :------- |
| provider.github.clientId     | string           | GitHub OAuth application's client ID.      | Yes      |
| provider.github.clientSecret | string           | GitHub OAuth application's client secret.  | Yes      |
| options.allowedDomains       | string           | Comma-separated list of allowed domains.   | No       |
| options.baseURL              | string or "/api" | Base path for auth routes (defaults: /api) | No       |
