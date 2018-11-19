import * as React from 'react';
import { Route, Switch } from 'react-router';
import { DemoPage as AppContainer } from 'app/containers/App';
import r11 from 'app/containers/1-1';
import r12 from 'app/containers/1-2';
import r21 from 'app/containers/2-1';
import r22 from 'app/containers/2-2';
import r31 from 'app/containers/3-1';
import r32 from 'app/containers/3-2';
import r33 from 'app/containers/3-3';
import r34 from 'app/containers/3-4';
/* PREPEND IMPORT HERE */
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <AppContainer>
    <Switch>
      <Route path="/11" component={r11} />
      <Route path="/12" component={r12} />
      <Route path="/21" component={r21} />
      <Route path="/22" component={r22} />
      <Route path="/31" component={r31} />
      <Route path="/32" component={r32} />
      <Route path="/33" component={r33} />
      <Route path="/34" component={r34} />
    </Switch>
  </AppContainer>
));
