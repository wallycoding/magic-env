const injectEnv = (list: [string, string][]) => {
  list.forEach(([key, value]) => {
    process.env[key] = String(value);
  });
};

export default injectEnv;
