import { handleActions } from 'redux-actions';
import { RootState } from './RootState';
import { demoActions } from 'app/actions/demo';
import { DemoModel } from 'app/models/DemoModel';

const initialState: RootState.DemoState = {
  data: [],
  loading: true,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  }
}

export const demoReducer = handleActions<RootState.DemoState, DemoModel>(
  {
    [demoActions.Type.FETCH_DATA]: (state, action) => {
      return state;
    },
    [demoActions.Type.SET_DATA]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
  initialState
);
