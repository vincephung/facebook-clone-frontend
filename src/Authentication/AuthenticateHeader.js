import AuthenticateUser from './AuthenticateUser';

const AuthenticateHeader = () => {
  return {
    'Content-type': 'application/json',
    Authorization: AuthenticateUser(),
  };
};

export default AuthenticateHeader;
