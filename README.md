# svelte-twittr

This is a folk using SvelteKit v1.0.0 from the original SvelteKit v1.0.0-next.392 project [`Full Stack SvelteKit For Beginners`](https://joyofcode.xyz/sveltekit-for-beginners).

## Project Setup

🧑‍🤝‍🧑 Clone the project

```sh
git clone https://github.com/joysofcode/sveltekit-for-beginners.git
```

📦️ Install dependencies

```sh
npm i
```

## Database

Register and create a database url and shadow database url from (`Supabase`)[`https://supabase.com/docs/guides/integrations/prisma`]

✏️ Update or create a `.env` file with the following content:

```
DATABASE_URL="..." # Supabase Connection string
SHADOW_DATABASE_URL="..."
PUBLIC_SUPABASE_URL="..." # Supabase Project URL
PUBLIC_SUPABASE_ANON_KEY="..."" # Supabase public anon key
```

🔨 Create a database from the Prisma schema

```sh
npx prisma db push
```

🌱 Seed the database

```sh
npx prisma db seed
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
