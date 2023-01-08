import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthContext from '../context/AuthProvider';
import { useContext, useEffect } from 'react';

const Auth = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useAuth();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth]);

  return children;
};

export default Auth;
