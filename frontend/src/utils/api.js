import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

// =================== AUTH ===================
const login = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};

const verify = async () => {
  const response = await axios.get('/auth/');
  return response.data;
};

// ================ Apartments ==================
const getAllApartments = async () => {
  const response = await axios.get('/apartments/');
  return response.data;
};

const addApartment = async (data) => {
  const response = await axios.post('/apartments', data);
  return response.data;
};

const updateApartment = async (id, data) => {
  const response = await axios.put(`/apartments/${id}`, data);
  return response.data;
};

const deleteApartment = async (id) => {
  const response = await axios.delete(`/apartments/${id}`);
  return response.data;
};

export { login, verify, getAllApartments, addApartment, updateApartment, deleteApartment };
