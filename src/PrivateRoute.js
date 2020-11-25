import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ render: Component, ...props }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);
  if (authenticated === null) {
    return <></>;
  }
  return (
    <Route
      {...props}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to={'/home'} />
      }
    ></Route>
  );
};

export default PrivateRoute;
