# MAGIC ENV

### install

`npm install --save magic-env` or `yarn add magic-env`

### usage

- env
  ```sh
  YOUR_NUMBER=1001
  YOUR_TEXT="hello"
  YOUR_SECRET_KEY=fn@uuid()
  YOUR_DB=fn@prisma(db, user, password, host, port, query)
  ```
- code

  ```ts
  import "magic-env/use";
  ```

  ```ts
  import { useEnv } from "magic-env";
  useEnv("path"); // path is optional
  ```
