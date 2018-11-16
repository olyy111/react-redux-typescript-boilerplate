import { createAction } from 'redux-actions';
// import { DemoModel } from 'app/models';

export namespace demoActions {
  export enum Type {
    FETCH_DATA = 'FETCH_DATA',
    SET_DATA = 'SET_DATA'
  }

  export const fetchData = createAction(Type.FETCH_DATA);
  export const setData = createAction((Type.SET_DATA));
}

export type demoActions = Omit<typeof demoActions, 'Type'>;
