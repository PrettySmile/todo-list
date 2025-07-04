/// 规定
///  1. 一个中文字符就是两个字节长度，
///  2. 一个英文字符就是一个字节长度
const byteLength = (str: string): number => {
  let total = 0;
  if (!str || str === "") return total;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    // 汉字（Unicode范围：\u4E00-\u9FFF）按两个字节计算
    if (charCode >= 0x4e00 && charCode <= 0x9fff) {
      total += 2;
    } else {
      total += 1; // 其他字符按一个字节计算
    }
  }
  return total;
};

/// 整数字符串约束检测
export const intString = (value: string): boolean => {
  return /^[0-9]+$/.test(value);
};

export const maxBytes =
  (max: number) =>
  (value: string): boolean =>
    byteLength(value) <= max;
