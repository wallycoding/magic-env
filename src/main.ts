import { readEnvFile } from './utils/env-file';

export const useEnv = (path: string = "./.env") => {
  if (process.env.NODE_ENV === "production") return;
  readEnvFile(path);
}
