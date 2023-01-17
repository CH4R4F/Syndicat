import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { addPayment, getRentedApartments } from '../../utils/api';

const AddPayment = () => {
  const [data, setData] = useState({
    amount: '',
    date: '',
  });
  const [selectedApartment, setSelectedApartment] = useState({
    item: null,
    idx: null,
    id: null,
  });
  const [apartments, setApartments] = useState([]);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetchData() {
      let { apartments } = await getRentedApartments();
      apartments = apartments.map((a) => {
        return {
          name: a.number,
          id: a._id,
        };
      });

      setApartments(apartments);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = data.amount;
    const date = data.date;
    const apartment = selectedApartment.id;
    try {
      await addPayment({ amount, date, apartment });
      navigate('/payments');
    } catch (error) {
      setErrors(error.response?.data?.message);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Add Apartment</h1>
      <form onSubmit={handleSubmit} className="m-6">
        <div className="flex flex-col gap-6">
          <Input
            onChange={handleChange}
            value={data.amount}
            name="amount"
            type="number"
            id="amount"
            placeholder="Amount"
          />
          <Input onChange={handleChange} value={data.date} name="date" type="date" id="date" placeholder="Date" />
          <div className="flex justify-between items-center mt-5">
            <Select
              options={apartments}
              selectedItem={selectedApartment}
              setSelectedItem={setSelectedApartment}
              label="Select Apartment"
            />
          </div>
          <Button type="submit" text="Add Payment" />
        </div>
      </form>
    </div>
  );
};

export default AddPayment;
