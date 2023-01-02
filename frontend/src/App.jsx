import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Login } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/apartments" element={<h1>Apartments</h1>} />
        <Route path="/apartments/new" element={<h1>add apartment</h1>} />
        <Route path="/tenants" element={<h1>Tenants</h1>} />
        <Route path="/tenants/new" element={<h1>add tenant</h1>} />
        <Route path="/tenants/:id" element={<h1>tenant details</h1>} />

        <Route path="/rents" element={<h1>Rents</h1>} />
        <Route path="/rents/new" element={<h1>new rent</h1>} />
        <Route path="/rents/:id" element={<h1>rent detail</h1>} />

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
