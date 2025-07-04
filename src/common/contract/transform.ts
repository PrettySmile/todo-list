// 保证非0整数
export const toNonZeroIntOr =
  (defaultValue: number = 1) =>
  (v?: string) =>
    (v && Number(v)) || defaultValue;
