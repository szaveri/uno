export const has = Object.prototype.hasOwnProperty;

export function deepCopy(object: any) {
  const copiedObj: any = {};

  Object.keys(object).forEach((key) => {
    if (has.call(object, key)) {
      copiedObj[key] = object[key];
    }
  });

  return copiedObj;
}
