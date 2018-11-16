import { demoActions } from '../actions/demo'
import { takeEvery, call, put } from 'redux-saga/effects'
import { GET } from '../utils/query';
import { rapFlag } from '../config/config';

const API = 'member/list'

function* fetchData(action: any) {
  const {current,pageSize} = action.payload;
  let { data } = yield call(GET, API,{
    pageNum: current,
    pageSize: pageSize,
  }, rapFlag);
  if (data) {
    console.log('data', data)
    yield put(demoActions.setData({
      data:data.results,
      loading:false,
      pagination: data.info
    }));
  }
}

export default function* watchFetchData() {
  yield takeEvery(demoActions.Type.FETCH_DATA, fetchData)
}
