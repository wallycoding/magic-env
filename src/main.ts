import functions, { EnvFunction } from "./utils/interpreter/functions";
import { readEnvFileAsArray } from "./utils/read/readEnvFile";

type EnvFunctions = {
  [k: string]: EnvFunction;
};

export const useEnv = (
  path: string = "./.env",
  loadFunctions?: EnvFunctions
) => {
  if (process.env.NODE_ENV === "production") return;
  if (loadFunctions)
    Object.entries(loadFunctions).forEach(([key, value]) => {
      functions.set(key, value);
    });
  readEnvFileAsArray(path);
};

export default useEnv;
