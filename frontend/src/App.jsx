import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Login, Dashboard, Tenants, AddTenant } from './pages';
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="apartments" element={<h1>Apartments</h1>} />
          <Route path="apartments/new" element={<h1>add apartment</h1>} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="tenants/new" element={<AddTenant />} />
          <Route path="tenants/:id" element={<h1>tenant details</h1>} />
          <Route path="buildings" element={<h1>Buildings</h1>} />
          <Route path="buildings/new" element={<h1>add building</h1>} />
          <Route path="buildings/:id" element={<h1>building details</h1>} />
          <Route path="payments" element={<h1>Payments</h1>} />
          <Route path="payments/new" element={<h1>add payment</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
