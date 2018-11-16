import { all, fork } from 'redux-saga/effects';
import demoSaga from './demoSaga'

export function* rootSaga() {
  yield all([demoSaga].map(fork));
}
