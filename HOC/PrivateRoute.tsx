import React from 'react';
import { Route, useNavigate,NavigateFunction } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute: React.FC<any> = ({...props}) => {
    const { Component, isAuthenticated,...rest } = props;
    const navigate:NavigateFunction = useNavigate();

    if(!isAuthenticated) {
         navigate('/signin')
        return null;
    }
  return (
    <Route
      {...rest}
      element={
        <Component {...rest} />
      }
    />
  );
};

export default PrivateRoute;
