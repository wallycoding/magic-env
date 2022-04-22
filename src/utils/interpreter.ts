import crypto from "crypto";
import { replaceLine, writeEnv } from "./env-file";
import allRegex from "./regex";

interface DefaultParams {
  path: string;
  key: string;
  value: string;
  index: number;
}

const functions: any = {
  uuid(params: DefaultParams) {
    const uuid = crypto.randomUUID();
    replaceLine(params.path, `${params.key}="${uuid}"`, params.index);
    return uuid;
  },
  database(params: DefaultParams, [db, user, password, query = ""]: string[]) {
    const url = `${db}://${user}:${password}@localhost:5432/${query}`;
    replaceLine(params.path, `${params.key}="${url}"`, params.index);
    return url;
  },
};

const stringFilter = (value: string) => {
  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    value.startsWith('"') ||
    value.endsWith('"')
  )
    return value.slice(1, value.length - 1).trim();
  return value.trim();
};

function interpretFunctions({ path, key, value, index }: DefaultParams) {
  const match = value.match(allRegex.fn);
  if (match) {
    const fn = match[2];
    const fnParams = match[3] || null;
    if (!functions[fn]) return stringFilter(value);
    const newValue = functions[fn](
      { path, key, value, index },
      fnParams && fnParams.split(",").map(stringFilter)
    );
    return newValue;
  }
  return stringFilter(value);
}

export default interpretFunctions;
