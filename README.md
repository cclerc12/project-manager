## Get Started

```sh
npm i
run prisma generate
```

## Create a Database

Prisma defaults to Postgres.
I suggest going to [Railway.app](https://railway.app/) and spinning one up if you don't have a local instance.

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

The solution that worked for me was to remove this from the package.json file.

```sh
"type": "module"
```
