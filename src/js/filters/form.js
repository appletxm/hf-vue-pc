// 空白填充
export function filterBlank(val) {
  return val || '-';
}

// 加密身份证号码
export function transformIdCard(val) {
  if (val) {
    return `${val.substr(0, 4)}**********${val.substr(-4)}`;
  }
  return '';
}
