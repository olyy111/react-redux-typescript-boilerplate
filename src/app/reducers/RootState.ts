import {
  DemoModel,
  CommonModel,
  /* PREPEND IMPORT HERE */
} from 'app/models';

export interface RootState {
  router?: any;
  demo: RootState.DemoState;
  common: RootState.CommonState;
  /* PREPEND ATTR1 HERE */
}

export namespace RootState {
  export type DemoState = DemoModel;
  export type CommonState = CommonModel[];
  /* PREPEND ATTR2 HERE */
}
