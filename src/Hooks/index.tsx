import React from 'react';
import AuthProvider from './auth';

const providers = [AuthProvider];

const CombineProviders: React.FC = ({ children }) => {
  return (
    <>
      {providers.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

export default CombineProviders;
