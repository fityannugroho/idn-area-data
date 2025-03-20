# idn-area-data with PostgreSQL example

This example shows how to use the `idn-area-data` package with PostgreSQL using [`postgres`](https://www.npmjs.com/package/postgres) driver.

Database migration and seeding are provided (see [`db/migration.ts`](./db/migration.ts) and [`db/seeder.ts`](./db/seeder.ts)).

- Install dependencies:

  ```bash
  npm install
  ```

- Run database migration:

  ```bash
  npm run db:migrate
  ```

- Run database seeding:

  ```bash
  npm run db:seed
  ```

- Start the application:
  ```bash
  npm start
  ```
