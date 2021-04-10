import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Sign from 'Pages/Sign';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Sign} />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
