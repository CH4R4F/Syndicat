import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { login } from '../utils/api';
import Input from '../components/Input';
import emailIcon from '../assets/icons/email.jsx';
import lockIcon from '../assets/icons/lock.jsx';
import loginCover from '../assets/images/login-cover.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  useAuth();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      setAuth(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa autem,
            at itaque nostrum!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 mb-0 max-w-md space-y-4">
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! &nbsp; &nbsp; &nbsp;</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <Input
            type="email"
            placeholder="Enter email"
            Icon={emailIcon}
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
          />

          <Input
            type="password"
            placeholder="Enter password"
            Icon={lockIcon}
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />

          <Button type="submit" text="Sign In" />
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img alt="Welcome" src={loginCover} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </section>
  );
};

export default Login;
