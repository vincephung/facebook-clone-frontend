const AuthenticateUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  //checks if user is logged in and gives them access to stuff
  if (user && user.token) {
    return `Bearer ${user.token}`;
  }

  return {};
};

export default AuthenticateUser;
