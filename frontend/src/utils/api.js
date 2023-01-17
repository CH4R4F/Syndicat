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

const getApartmentDetails = async (number) => {
  const response = await axios.get(`/apartments/${number}`);
  return response.data;
};

const getRentedApartments = async () => {
  const response = await axios.get('/apartments/rented');
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

const getApartmentsByBuildingId = async (id) => {
  const response = await axios.get(`/apartments/building/${id}`);
  return response.data;
};

// ================== Buildings ====================
const getAllBuildings = async () => {
  const response = await axios.get('/buildings/');
  return response.data;
};

const getBuildingById = async (id) => {
  const response = await axios.get(`/buildings/${id}`);
  return response.data;
};

const addBuilding = async (data) => {
  const response = await axios.post('/buildings', data);
  return response.data;
};

const updateBuilding = async (id, data) => {
  const response = await axios.put(`/buildings/${id}`, data);
  return response.data;
};

const deleteBuilding = async (id) => {
  const response = await axios.delete(`/buildings/${id}`);
  return response.data;
};

// ================== Tenants ====================
const getAllTenants = async () => {
  const response = await axios.get('/tenants/');
  return response.data;
};

const addTenant = async (data) => {
  const response = await axios.post('/tenants', data);
  return response.data;
};

const updateTenant = async (id, data) => {
  const response = await axios.put(`/tenants/${id}`, data);
  return response.data;
};

const deleteTenant = async (id) => {
  const response = await axios.delete(`/tenants/${id}`);
  return response.data;
};

const getTenantById = async (id) => {
  const response = await axios.get(`/tenants/${id}`);
  return response.data;
};

// ================== Payments ====================
const getAllPayments = async () => {
  const response = await axios.get('/payments/');
  return response.data;
};

const addPayment = async (data) => {
  const response = await axios.post('/payments', data);
  return response.data;
};

const getPaymentById = async (id) => {
  const response = await axios.get(`/payments/${id}`);
  return response.data;
};

const removePayment = async (id) => {
  const response = await axios.delete(`/payments/${id}`);
  return response.data;
};

// ================== Statistics ====================
const getStatistics = async () => {
  const response = await axios.get('/statistics/');
  return response.data;
};

export {
  login,
  verify,
  getAllApartments,
  getApartmentDetails,
  getApartmentsByBuildingId,
  getRentedApartments,
  addApartment,
  updateApartment,
  deleteApartment,
  getAllBuildings,
  getBuildingById,
  addBuilding,
  updateBuilding,
  deleteBuilding,
  getAllTenants,
  addTenant,
  getTenantById,
  updateTenant,
  deleteTenant,
  getAllPayments,
  addPayment,
  getPaymentById,
  removePayment,
  getStatistics,
};
