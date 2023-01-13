import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllTenants, deleteTenant } from '../../utils/api';
import Button from '../../components/Button';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    async function fetchTenants() {
      try {
        const { tenants } = await getAllTenants();
        setTenants(tenants);
      } catch (error) {
        setErrors(error.response.data?.message);
      }
    }
    fetchTenants();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteTenant(id);
      setTenants(tenants.filter((tenant) => tenant._id !== id));
    } catch (error) {
      setErrors(error.response.data?.message);
    }
  }

  return (
    <div className="wrapper">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tenants</h1>
        <Link to="/tenants/new">
          <Button text="Add Tenant" />
        </Link>
      </div>
      {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! &nbsp; &nbsp;</strong>
          <span className="block sm:inline">{errors}</span>
        </div>
      )}
      <div className="mt-6 overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
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
          <tbody className="divide-y divide-gray-200">
            {!tenants.length && (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center" colSpan={6}>
                  No tenants found
                </td>
              </tr>
            )}
            {tenants.map((tenant) => (
              <tr key={tenant._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tenant.firstName}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tenant.lastName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{tenant.CIN}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{tenant.telephone}</td>
                <td className="whitespace-nowrap py-2 text-gray-900 text-center">
                  <Link to={`/tenants/${tenant._id}`}>
                    <Button text="Edit" />
                  </Link>
                </td>
                <td className="whitespace-nowrap py-2 text-gray-900 text-center">
                  <button
                    onClick={() => handleDelete(tenant._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
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
