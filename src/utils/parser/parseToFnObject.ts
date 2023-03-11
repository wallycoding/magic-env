import parseToFunctionInfo from "./parseToFunctionInfo";
import parseToRawInfo from "./parseToRawInfo";

const parseToInfoObject = (line: string) => {
  const isFunction = line.startsWith("fn@");
  if (isFunction)
    return {
      function: parseToFunctionInfo(line),
    };
  return parseToRawInfo(line);
};

export type InfoObject = ReturnType<typeof parseToInfoObject>;

export default parseToInfoObject;
