import path from "node:path";
import crypto from "node:crypto";
import * as lib from "../src/main";

describe("all checks useEnv", () => {
  test("check if useEnv is a function", () => {
    expect(typeof lib.useEnv).toBe("function");
  });
  test("read file .env.test and check return", () => {
    const envPath = path.resolve(".", "test", ".env.test");
    const spyUseEnv = jest.spyOn(lib, "useEnv");
    lib.useEnv(envPath, {
      uuid() {
        return [["TEST_UUID", crypto.randomUUID()]];
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
            "TEST_PRISMA_DB_URL",
            `${database}://${user}:${password}@localhost:${port}/${query}`,
          ],
        ];
      },
    });
    expect(spyUseEnv).toBeCalled();
    expect(process.env.TEST_TEXT).toEqual("hello");
    expect(process.env.TEST_NUMBER).toEqual("1001");
    expect(process.env.TEST_UUID).toBeTruthy();
    expect(process.env.TEST_PRISMA_DB_URL).toEqual(
      "postgres://wallycoding:good_password@localhost:4444/?schemas=public"
    );
  });
});
