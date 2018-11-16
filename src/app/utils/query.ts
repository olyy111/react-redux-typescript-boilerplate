import request from './request';
import * as qs from 'qs';
import {rapHost, onlinePath} from '../config/config'

const FormdataWrapper = require('object-to-formdata');
const merge = require('merge-object');

const cookieTrue = {
  credentials: 'include'
};
const jsonConf = {
  headers: {
    'Content-Type': 'application/json'
  }
}

function getUrl(smarturl: string,flag: boolean) {
  if(flag){
    return rapHost + '/' + smarturl;
  }else{
    return onlinePath + smarturl;
  }
}

async function POST(url: string,params: any,rapFlag: boolean,isJson: boolean){
  if(isJson == undefined){isJson = false};
  return request( getUrl(url,rapFlag),rapFlag?{  //如果为rap请求 就去掉 credentials: 'include'来允许跨域
    method: 'POST',
    body:isJson?JSON.stringify(params):FormdataWrapper(params),
  }:merge({
    method: 'POST',
    body:isJson?JSON.stringify(params):FormdataWrapper(params),
  },isJson?merge(jsonConf,cookieTrue):cookieTrue),rapFlag);
}

async function GET(url: string,params: any,rapFlag: boolean){
  return request( getUrl(url,rapFlag) + `?${qs.stringify(params)}`,rapFlag?{
    method: 'GET',
  }:merge({
    method: 'GET',
  },cookieTrue),rapFlag);
}

export {
  POST, GET
}
