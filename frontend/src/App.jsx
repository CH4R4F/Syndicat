import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import {
  Login,
  Dashboard,
  Tenants,
  AddTenant,
  TenantDetails,
  Buildings,
  AddBuilding,
  BuildingDetails,
  Apartments,
  AddApartment,
  ApartmentDetails,
} from './pages';
import NotFound from './components/NotFound';
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="apartments" element={<Apartments />} />
          <Route path="apartments/new" element={<AddApartment />} />
          <Route path="apartments/:number" element={<ApartmentDetails />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="tenants/new" element={<AddTenant />} />
          <Route path="tenants/:id" element={<TenantDetails />} />
          <Route path="buildings" element={<Buildings />} />
          <Route path="buildings/new" element={<AddBuilding />} />
          <Route path="buildings/:id" element={<BuildingDetails />} />
          <Route path="payments" element={<h1>Payments</h1>} />
          <Route path="payments/new" element={<h1>add payment</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
