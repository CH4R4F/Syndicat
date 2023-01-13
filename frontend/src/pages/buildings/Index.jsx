import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { getAllBuildings, deleteBuilding } from '../../utils/api';

const Index = () => {
  const [buildings, setBuildings] = useState([]);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const { buildings } = await getAllBuildings();
        setBuildings(buildings);
      } catch (err) {
        setErrors(err.response?.data?.message);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteBuilding(id);
      setBuildings(buildings.filter((building) => building._id !== id));
    } catch (err) {
      setErrors(err.response?.data?.message);
    }
  }

  return (
    <div className="wrapper">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Buildings</h1>
        <Link to="/buildings/new">
          <Button text="Add Building" />
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
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Address</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">City</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Number of floors</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Number of apartments</th>

              <th colSpan="2" className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!buildings.length && (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900 text-center" colSpan={6}>
                  No buildings found
                </td>
              </tr>
            )}
            {buildings.map((building) => (
              <tr key={building._id}>
                <td className="px-4 py-2 whitespace-nowrap">{building.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{building.address}</td>
                <td className="px-4 py-2 whitespace-nowrap">{building.city}</td>
                <td className="px-4 py-2 whitespace-nowrap">{building.numberOfFloors}</td>
                <td className="px-4 py-2 whitespace-nowrap">{building.numberOfApartments}</td>

                <td className="whitespace-nowrap py-2 text-gray-900 text-center">
                  <Link to={`/buildings/${building._id}`}>
                    <Button text="View" />
                  </Link>
                </td>
                <td className="whitespace-nowrap py-2 text-gray-900 text-center">
                  <button
                    onClick={() => handleDelete(building._id)}
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
