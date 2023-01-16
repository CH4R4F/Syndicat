import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { getApartmentDetails, updateApartment, getAllBuildings, getAllTenants } from '../../utils/api';
import { Oval } from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import Button from '../../components/Button';
import Select from '../../components/Select';

const ApartmentDetails = () => {
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState({
    item: null,
    idx: null,
    id: null,
  });
  const [selectedTenant, setSelectedTenant] = useState({
    item: null,
    idx: null,
    id: null,
  });
  const [buildings, setBuildings] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { number } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const { apartment } = await getApartmentDetails(number);
        setApartmentNumber(apartment.number);
        setSelectedBuilding({
          item: apartment.building?.name || '',
          idx: 0,
          id: apartment.building?._id || '',
        });
        setSelectedTenant({
          item: apartment.tenant ? apartment.tenant.firstName + ' ' + apartment.tenant.lastName : '',
          idx: 0,
          id: apartment.tenant ? apartment.tenant._id : '',
        });
        let { buildings } = await getAllBuildings();
        buildings = buildings.map((b) => {
          return {
            name: b.name,
            id: b._id,
          };
        });
        let { tenants } = await getAllTenants();
        tenants = tenants.map((t) => {
          return {
            name: t.firstName + ' ' + t.lastName,
            id: t._id,
          };
        });
        setBuildings(buildings);
        setTenants(tenants);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setNotFound(true);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setApartmentNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const number = apartmentNumber;
    const building = selectedBuilding.id;
    const tenant = selectedTenant.id;
    const status = tenant ? 'occupied' : 'vacant';
    try {
      await updateApartment(number, { number, status, building, tenant });
      navigate('/apartments');
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval color="#00BFFF" secondaryColor="#00BEEE" height={100} width={100} />
      </div>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold underline">Apartment Details</h1>
      <div className="mt-5">
        <ul>
          <li>
            <span className="font-bold">Apartment Number:</span> {apartmentNumber}
          </li>
          <li>
            <span className="font-bold">Building:</span> {selectedBuilding.item}
          </li>
          <li>
            <span className="font-bold">Tenant:</span> {selectedTenant.item}
          </li>
        </ul>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold underline">Update Apartment</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <Input
              placeholder="Apartment Number"
              showLabel={true}
              name="apartmentNumber"
              id="apartmentNumber"
              label="Apartment Number"
              type="text"
              value={apartmentNumber}
              onChange={handleChange}
            />
            <div className="flex justify-between items-center mt-5">
              <Select
                label="Select Building"
                options={buildings}
                setSelectedItem={setSelectedBuilding}
                selectedItem={selectedBuilding}
              />
              <Select
                label="Select Tenant"
                options={tenants}
                setSelectedItem={setSelectedTenant}
                selectedItem={selectedTenant}
              />
            </div>
          </div>
          <Button type="submit" text="Update" />
        </form>
      </div>
    </div>
  );
};

export default ApartmentDetails;
