import { readFileSync } from "node:fs";
import injectEnv from "../inject/injectEnv";
import applyInfo from "../interpreter/applyInfo";
import functions from "../interpreter/functions";
import parseToInfoObject from "../parser/parseToFnObject";

export const readEnvFileAsArray = (path: string) => {
  const lines = readFileSync(path, { encoding: "utf-8" })
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"));
  const newLines = lines.map((line) => {
    const infoObject = parseToInfoObject(line);
    return applyInfo(infoObject)?.flat(1);
  }) as [string, string][];
  injectEnv(newLines);
};
