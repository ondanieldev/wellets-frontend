import React from 'react';

import NavLink from './NavLink';

interface IProps {
  color?: string;
  location?: { pathname: string };
}

const Links: React.FC<IProps> = props => (
  <>
    <NavLink to="/wallets" {...props}>
      Wallets
    </NavLink>
    <NavLink to="/currencies" {...props}>
      Currencies
    </NavLink>
  </>
);

export default Links;
