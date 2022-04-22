import fs from "fs";
import path from "path";
import * as lib from "../src/main";

describe("all checks useEnv", () => {
  test("check if useEnv is a function", () => {
    expect(typeof lib.useEnv).toBe("function");
  });
  test("read file .env.test and check return", () => {
    const envPath = path.resolve(".", "test", ".env.test");
    const spyUseEnv = jest.spyOn(lib, "useEnv");
    lib.useEnv(envPath);
    expect(spyUseEnv).toBeCalled();
    expect(!!process.env.TEST_NUMBER).toBeTruthy();
    expect(!!process.env.TEST_TEXT).toBeTruthy();
    expect(!!process.env.TEST_SECRET_KEY).toBeTruthy();
    expect(!!process.env.TEST_DB).toBeTruthy();
    const fileContext = `TEST_NUMBER=${process.env.TEST_NUMBER}\nTEST_TEXT="${process.env.TEST_TEXT}"\nTEST_SECRET_KEY="${process.env.TEST_SECRET_KEY}"\nTEST_DB="${process.env.TEST_DB}"`;
    const envFile = fs.readFileSync(envPath, { encoding: "utf-8" });
    expect(envFile).toBe(fileContext);
  });
});
