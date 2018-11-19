import { all, fork } from 'redux-saga/effects';

// 直接引入当前目录下所有的xxxSaga文件导出
let sagasArray: any = [];
function importAll (r: any) {
  r.keys().forEach((key: any) => sagasArray.push(r(key)));
  sagasArray = sagasArray.map((v: any) => v.default)
}
importAll(require.context('./', true, /.*Saga\.ts/));

export function* rootSaga() {
  yield all(sagasArray.map(fork));
}
