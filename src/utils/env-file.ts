import { readFileSync, writeFileSync, existsSync } from "fs";

import interpretFunctions from "./interpreter";
import allRegex from "./regex";

export const replaceLine = (
  path: string,
  newLine: string,
  lineIndex: number
) => {
  try {
    const data = readFileSync(path, { encoding: "utf-8" });
    const currentData = data
      .split("\n")
      .map((line, i) => {
        return i === lineIndex ? newLine : line;
      })
      .join("\n");
    try {
      writeFileSync(path, currentData);
    } catch (error) {
      throw Error(`Unexpected error in write ${path}`);
    }
  } catch (error) {
    throw Error(`Unexpected error in read ${path}`);
  }
};

const setInENV = (key: string, value: string) => (process.env[key] = value);

export const readEnvFile = (path: string) => {
  const file = readFileSync(path, { encoding: "utf-8" });
  if (!existsSync(`${path}.example`)) {
    writeEnv(`${path}.example`, file);
  }
  file.split(/\n/g).forEach((line, index) => {
    const match = line.match(allRegex.split);
    if (match) {
      const key = match[1].trim();
      const value = match[3].trim() || "";
      setInENV(key, interpretFunctions({ path, key, value, index }));
    } else {
      if (!line.length) return;
      throw Error(`Your file ${path} is invalid, error in line ${index + 1}!`);
    }
  });
};

export const writeEnv = (path: string, data: string) => {
  try {
    writeFileSync(path, data);
  } catch (error) {
    throw Error(`Unexpected error in write ${path}`);
  }
};
