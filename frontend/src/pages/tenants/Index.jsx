import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTenants } from '../../utils/api';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    async function fetchTenants() {
      const { tenants } = await getAllTenants();
      setTenants(tenants);
    }
    fetchTenants();
  }, []);

  return (
    <div className="wrapper">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tenants</h1>
        <Link to="/tenants/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Tenant</button>
        </Link>
      </div>
      <div class="mt-6 overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">First Name</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Last Name</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">CIN</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Phone</th>
              <th colSpan={2} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {tenants.map((tenant) => (
              <tr key={tenant._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tenant.firstName}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tenant.lastName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{tenant.CIN}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{tenant.telephone}</td>
                <td className="whitespace-nowrap py-2 text-gray-900 text-center">
                  <Link to={`/tenants/${tenant._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="whitespace-nowrap py-2 text-gray-900 text-center">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tenants;
