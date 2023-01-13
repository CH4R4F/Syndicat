import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { getBuildingById, updateBuilding } from '../../utils/api';
import { Oval } from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Button from '../../components/Button';

const BuildingDetails = () => {
  const [building, setBuilding] = useState({
    name: '',
    address: '',
    city: '',
    numberOfFloors: '',
    numberOfApartments: '',
  });
  const [apartments, setApartments] = useState([]);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBuilding({
      ...building,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBuilding(id, building);
      navigate('/buildings');
    } catch (error) {
      setErrors(error.response?.data?.message);
    }
  };

  // get building informations
  useEffect(() => {
    async function fetchBuilding() {
      try {
        const { building } = await getBuildingById(id);
        setBuilding(building);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 404) {
          setNotFound(true);
        }
        setErrors(error.response.data?.message);
      }
    }
    fetchBuilding();
  }, [id]);

  // render not found page if building is not found
  if (notFound) {
    return <NotFound />;
  }

  // render loading spinner if building is not loaded yet
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Oval type="ThreeDots" color="#00BFFF" secondaryColor="#00BEEE" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <h1>Building Details</h1>
      <div className="mt-5">
        <ul>
          <li>
            <span className="font-bold">Name:</span> {building.name}
          </li>
          <li>
            <span className="font-bold">Address:</span> {building.address}
          </li>
          <li>
            <span className="font-bold">City:</span> {building.city}
          </li>
          <li>
            <span className="font-bold">Number of floors:</span> {building.numberOfFloors}
          </li>
          <li>
            <span className="font-bold">Number of apartments:</span> {building.numberOfApartments}
          </li>
        </ul>
      </div>

      {/* <div className="mt-10">
      <h2>Apartments</h2>
    </div> */}

      <div className="mt-10">
        <h1>Update Building</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <Input
              showLabel={true}
              label="Name"
              type="text"
              name="name"
              value={building.name}
              onChange={handleChange}
            />
            <Input
              showLabel={true}
              label="Address"
              type="text"
              name="address"
              value={building.address}
              onChange={handleChange}
            />
            <Input
              showLabel={true}
              label="City"
              type="text"
              name="city"
              value={building.city}
              onChange={handleChange}
            />
            <Input
              showLabel={true}
              label="Number of floors"
              type="number"
              name="numberOfFloors"
              value={building.numberOfFloors}
              onChange={handleChange}
            />
            <Input
              showLabel={true}
              label="Number of apartments"
              type="number"
              name="numberOfApartments"
              value={building.numberOfApartments}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6">
            <Button type="submit" text="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuildingDetails;
