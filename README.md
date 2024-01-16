## Get Started

```sh
npm i
npm install @prisma/client
npx prisma generate
```

## Create a Database

Prisma defaults to Postgres.
I suggest going to [Railway.app](https://railway.app/) and spinning up a db if you don't have a local instance.

## Add postgres db URL in .env

```sh
DATABASE_URL="postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample"
```

## Seed database

```sh
npx prisma db seed
```

## ⚠️Issues with seeding

If you get this error:

```sh
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"
```

The [solution](https://github.com/prisma/prisma/issues/7053) that worked for me was to remove this:

```sh
"type": "module"
```

from the package.json file when seeding, but add it back once you are done.

You could also try:

```sh
node --loader ts-node/esm "prisma/seed.ts"
```

instead of:

```sh
npx prisma db seed
```

although, this doesn't work for me and I haven't spent the time to figure out why.
