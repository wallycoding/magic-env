"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_file_1 = require("./lib/utils/env-file");
if (process.env.NODE_ENV !== "production")
  (0, env_file_1.readEnvFile)("./.env");
