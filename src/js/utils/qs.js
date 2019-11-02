// import CryptoJS from 'crypto-js/crypto-js';

export const qsStringfy = function qsStringfy(data) {
  const obj = { ...data }
  data = ''
  for (const i in obj) {
    data = data + '&' + i + '=' + obj[i]
  }
  return data.substr(1)
}

// 获取地址栏里的参数
export const getUrlParams = function getUrlParams(queryName) {
  const searchStr = window.location.href.split('?')[1];
  if (!searchStr) {
    return '';
  }

  const paramsArr = searchStr.split('&');
  const result = {};
  let par;
  paramsArr.forEach((item) => {
    par = item.split('=');
    result[par[0]] = encodeURIComponent(par[1]);
  });

  return decodeURIComponent(result[queryName]);
}
