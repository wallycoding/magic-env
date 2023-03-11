const parseToFunctionInfo = (line: string) => {
  return {
    name: line.match(/fn@(\w+)/)![1],
    params: JSON.parse(`[${line.match(/(?<=\().+(?=\))/g)}]`) as any[],
  };
};

export default parseToFunctionInfo;
