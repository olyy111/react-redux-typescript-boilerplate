import 'whatwg-fetch';

const safeeval = require('safe-eval');
const Mock = require('mockjs');

function parseText(response: any) {
  return response.text();
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {boolean} rap       是否是rap请求 true是 false 否
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url: string, options: any,rap: boolean) {
  if(!rap){rap = false;}
  return fetch(url, options)
    .then(checkStatus)
    .then(parseText)
    .then((data) => {
      if(rap){
        return Mock.mock(safeeval(data))
      }else{
        return safeeval(data)
      }
    })
    .catch((err) => ({ err }));
}
