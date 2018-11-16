import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger as loggerMiddleware } from 'app/middleware';
import createSagaMiddleware from 'redux-saga';
import { RootState, rootReducer } from 'app/reducers';
import { rootSaga } from '../sagas'


export function configureStore(initialState?: RootState): Store<RootState> {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  let middleware = applyMiddleware(loggerMiddleware, sagaMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    RootState
  >;

  // then run the saga
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
