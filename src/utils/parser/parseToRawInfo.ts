const parseToRawInfo = (line: string) => {
  const matchKeyValue = line.match(/^([\w.-]+)=(.*)$/);
  if (!matchKeyValue) throw Error(`Invalid Line: ${line}`);
  const { 1: key, 2: value } = matchKeyValue;
  const newValue = value.replace(/^("|')(.+)(\1)$/, "$2");
  return {
    key,
    value: newValue,
  };
};

export default parseToRawInfo;
