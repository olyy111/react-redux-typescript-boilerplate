import { DemoModel, CommonModel } from 'app/models';

export interface RootState {
  demo: RootState.DemoState;
  common: RootState.CommonState;
  router?: any;
}

export namespace RootState {
  export type DemoState = DemoModel;
  export type CommonState = CommonModel[];
}
