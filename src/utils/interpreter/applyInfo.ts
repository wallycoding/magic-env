import { InfoObject } from "../parser/parseToFnObject";
import functions from "./functions";

const applyInfo = (info: InfoObject) => {
  if ("function" in info) {
    const fn = functions.get(info.function.name);
    return fn?.apply(null, info.function.params);
  } else {
    return [info.key, info.value];
  }
};

export default applyInfo;
