import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './components/Account/LoginPage';
import Profile from './components/Profile/Profile';
import TimelineDisplay from './components/Timeline/TimelineDisplay';
import Search from './components/Timeline/Search';
import PrivateRoute from './PrivateRoute';
import AuthenticateHeader from './Authentication/AuthenticateHeader';

function App() {
  //Checks if user is logged in / handle user requests
  const [currentUser, setCurrentUser] = useState({});
  const user = JSON.parse(localStorage.getItem('user')) || '';
  const [loggedIn, setLoggedIn] = useState(user || '');
  const userId = user ? user.user_id : '';
  document.body.style.backgroundColor = '#dfe3ee';

  useEffect(() => {
    const getUser = async () => {
      try {
        const url = `https://vincephung-facebook-clone.glitch.me/api/users/${userId}`;
        const response = await fetch(url, {
          method: 'get',
          mode: 'cors',
          headers: AuthenticateHeader(),
        });
        const userInfo = await response.json();
        setCurrentUser(userInfo);
      } catch (err) {
        console.error(err);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  const logOut = () => {
    localStorage.removeItem('user');
    setCurrentUser({});
    setLoggedIn(false);
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/home"
          render={(props) => <LoginPage {...props} loggedIn={loggedIn} />}
        />
        <PrivateRoute
          exact
          path="/users/profile/:id"
          render={(props) => (
            <Profile {...props} currentUser={currentUser} logOut={logOut} />
          )}
        />
        <PrivateRoute
          exact
          path="/users/timeline/:id"
          render={(props) => <TimelineDisplay {...props} logOut={logOut} />}
        />
        <PrivateRoute
          path="/users/:id/search"
          exact
          render={(props) => (
            <Search {...props} currentUser={currentUser} logOut={logOut} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
