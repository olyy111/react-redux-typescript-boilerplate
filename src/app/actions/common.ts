import { createAction } from 'redux-actions';
// import { DemoModel } from 'app/models';

export namespace commonActions {
  export enum Type {
    SET_BREADCRUMB = 'SET_BREADCRUMB'
  }

  export const changeBreadcrumb = createAction(Type.SET_BREADCRUMB);
}

export type commonActions = Omit<typeof commonActions, 'Type'>;
