# MAGIC ENV

### install

`npm install --save magic-env` or `yarn add magic-env`

### usage default 
- code
  ```ts
  import "magic-env/use";
  ```

- env
  ```sh
  TEST_TEXT="hello"
  TEST_NUMBER=1001
  ```

### env functions
- code

  ```ts
  import crypto from "node:crypto";
  import { useEnv } from "magic-env";
  useEnv("./.env", {
    uuid() {
      return [["UUID", crypto.randomUUID()]];
    },
    prismaConfig(
      database: string,
      user: string,
      password: string,
      port: number,
      query: string = "?schemas=public"
    ) {
      return [
        [
          "PRISMA_DB_URL",
          `${database}://${user}:${password}@localhost:${port}/${query}`,
        ],
      ];
    },
  });
  ```

- env
  ```sh
  TEST_TEXT="hello"
  TEST_NUMBER=1001
  fn@uuid()
  fn@prismaConfig("postgres", "wallycoding", "good_password", 4444)
  ```