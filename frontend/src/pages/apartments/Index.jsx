import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllApartments, deleteApartment } from '../../utils/api';
import Button from '../../components/Button';

const Index = () => {
  const [apartments, setApartments] = useState([]);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    async function fetchApartments() {
      try {
        const { apartments } = await getAllApartments();
        setApartments(apartments);
      } catch (error) {
        setErrors(error.response.data?.message);
      }
    }
    fetchApartments();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteApartment(id);
      setApartments(apartments.filter((apartment) => apartment._id !== id));
    } catch (error) {
      setErrors(error.response.data?.message);
    }
  }

  return (
    <div className="wrapper">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Apartments</h1>
        <Link to="/apartments/new">
          <Button text="Add Apartment" />
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
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Number</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Building</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Status</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Tenant</th>
              <th colSpan={2} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!apartments.length && (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center" colSpan={6}>
                  No tenants found
                </td>
              </tr>
            )}
            {apartments.map((apartment) => (
              <tr key={apartment._id}>
                <td className="px-4 py-2 whitespace-nowrap">{apartment.number}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {apartment.building ? (
                    <Link to={`/buildings/${apartment.building._id}`}>{apartment.building.name}</Link>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      N/A
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {apartment.status == 'vacant' ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Vacant
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Occupied
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {apartment.tenant ? apartment.tenant.firstName + ' ' + apartment.tenant.lastName : 'N/A'}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
                  <Link to={`/apartments/${apartment._id}`}>
                    <Button text="View" />
                  </Link>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium">
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

export default Index;
