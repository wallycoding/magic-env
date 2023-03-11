export type EnvFunction = (...args: any[]) => [string, string][];
const functions = new Map<string, EnvFunction>();
export default functions;
