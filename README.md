# Advanced Blog App

## About

- Uses NextJS V13
- App dir
- Clerk for auth
- Prisma ORM
- Cockroach DB
- [x] Allows only admins to write blogs
- [x] Allows you to set if anyone can read blog or if only logged in people can.
- [x] Dashboard
- [x] Read blogs
- [ ] Image uploads

## How to run

- Clone the repo
- Run

```bash
npm install
#or
yarn install
#or
pnpm install
```

to install the dependencies

- Create a `.env` and populate with the data from `.env.example`
- Run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

to start the dev server

## How to deploy

The easiest way to deploy this is on vercel.

Deploy now!  
[![Deploy with Vercel](https://vercel.com/button)](https://dub.sh/blog-app-deploy)
