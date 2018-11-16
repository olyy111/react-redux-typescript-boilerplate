import { combineReducers } from 'redux';
import { RootState } from './RootState';
import { demoReducer } from './demo';
import { commonReducer } from './common'

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  demo: demoReducer as any,
  common: commonReducer as any,
});
