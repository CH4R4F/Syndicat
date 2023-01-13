import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { addTenant } from '../../utils/api';

const AddTenant = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    CIN: '',
    telephone: '',
  });
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrors('');
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addTenant(data);
      navigate('/tenants');
    } catch (error) {
      setErrors(error.response.data?.message);
    }
  }

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Add Tenant</h1>
      {errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! &nbsp; &nbsp;</strong>
          <span className="block sm:inline">{errors}</span>
        </div>
      )}
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <Input
            onChange={handleChange}
            value={data.firstName}
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
          />
          <Input
            onChange={handleChange}
            value={data.lastName}
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
          />
          <Input onChange={handleChange} value={data.CIN} type="text" name="CIN" id="CIN" placeholder="CIN" />
          <Input
            onChange={handleChange}
            value={data.telephone}
            type="text"
            name="telephone"
            id="telephone"
            placeholder="Phone"
          />
          <Button type="submit" text="Add Tenant" />
        </div>
      </form>
    </div>
  );
};

export default AddTenant;
