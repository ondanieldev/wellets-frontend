import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from 'Pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={SignIn} />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
