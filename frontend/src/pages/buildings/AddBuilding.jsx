import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { addBuilding } from '../../utils/api';

const AddBuilding = () => {
  const [data, setData] = useState({
    name: '',
    address: '',
    city: '',
    numberOfFloors: '',
    numberOfApartments: '',
  });
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrors('');
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    try {
      await addBuilding(data);
      navigate('/buildings');
    } catch (error) {
      setErrors(error.response?.data?.message);
    }
  }

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Add Building</h1>
      {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! &nbsp; &nbsp;</strong>
          <span className="block sm:inline">{errors}</span>
        </div>
      )}

      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <Input onChange={handleChange} value={data.name} type="text" name="name" id="name" placeholder="Name" />
          <Input
            onChange={handleChange}
            value={data.address}
            type="text"
            name="address"
            id="address"
            placeholder="Address"
          />
          <Input onChange={handleChange} value={data.city} type="text" name="city" id="city" placeholder="City" />
          <Input
            onChange={handleChange}
            value={data.numberOfFloors}
            type="text"
            name="numberOfFloors"
            id="numberOfFloors"
            placeholder="Number of Floors"
          />
          <Input
            onChange={handleChange}
            value={data.numberOfApartments}
            type="text"
            name="numberOfApartments"
            id="numberOfApartments"
            placeholder="Number of Apartments"
          />
          <Button type="submit" text="Add Building" />
        </div>
      </form>
    </div>
  );
};

export default AddBuilding;
