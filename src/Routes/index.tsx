import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from 'Components/Atoms/Route';

import Sign from 'Pages/Sign';
import Menu from 'Pages/Menu';
import Wallets from 'Pages/Wallets';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Sign} />

      <Route path="/menu" component={Menu} isPrivate />

      <Route path="/wallets" component={Wallets} isPrivate />

      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
