# idn-area-data with MySQL example

This example shows how to use the `idn-area-data` package with MySQL using [`mysql2`](https://www.npmjs.com/package/mysql2) driver.

Database migration and seeding are provided (see [`db/migration.ts`](./db/migration.ts) and [`db/seeder.ts`](./db/seeder.ts)).

In the project directory, you can run:

- Database migration:

  ```bash
  npm run db:migrate
  ```

- Database seeding:

  ```bash
  npm run db:seed
  ```

- Start the application:
  ```bash
  npm start
  ```
