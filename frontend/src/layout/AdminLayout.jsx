import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  // a layout with a fixed sidebar and a fluid content
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="ml-96 py-24 w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
