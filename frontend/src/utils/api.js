import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

// =================== AUTH ===================
const login = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};

export { login };
