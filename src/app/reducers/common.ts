import { handleActions } from 'redux-actions';
import { RootState } from './RootState';
import { commonActions } from 'app/actions';
import { CommonModel } from 'app/models';

const initialState: RootState.CommonState = [{
  name: '首页',
  path: '/'
}];

export const commonReducer = handleActions<RootState.CommonState, CommonModel[]>(
  {
    [commonActions.Type.SET_BREADCRUMB]: (state, action) => {
      console.log('action', action)
      return action.payload || initialState;
    },
  },
  initialState
);
