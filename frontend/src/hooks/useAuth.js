import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { verify } from '../utils/api';

const useAuth = async () => {
  const { auth, setAuth } = useContext(AuthContext);

  try {
    if (!auth) {
      const response = await verify();
      if (response.success) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
  } catch (e) {
    setAuth(false);
  }
};

export default useAuth;
