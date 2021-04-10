import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from 'Components/Atoms/Route';
import Sign from 'Pages/Sign';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Sign} />

      <Route path="/menu" component={Sign} isPrivate />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
