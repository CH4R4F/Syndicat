import { useState, useEffect } from 'react';
import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTenants, getAllBuildings, addApartment } from '../../utils/api';

const AddApartment = () => {
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
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [buildings, setBuildings] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
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
      await addApartment({ number, status, building, tenant });
      navigate('/apartments');
    } catch (error) {
      setErrors(error.response?.data?.message);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Add Apartment</h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-6">
          <Input
            onChange={handleChange}
            value={apartmentNumber}
            type="number"
            name="number"
            id="number"
            placeholder="Number"
          />
          <div className="flex justify-between items-center mt-5">
            <Select
              options={buildings}
              label="Select Building"
              selectedItem={selectedBuilding}
              setSelectedItem={setSelectedBuilding}
            />
            <Select
              options={tenants}
              label="Select Tenant"
              selectedItem={selectedTenant}
              setSelectedItem={setSelectedTenant}
            />
          </div>
          <Button type="submit" text="Add Apartment" />
        </div>
      </form>
    </div>
  );
};

export default AddApartment;
