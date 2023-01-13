import { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { getTenantById, updateTenant } from '../../utils/api';
import { Oval } from 'react-loader-spinner';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from '../../components/NotFound';

const TenantDetails = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    CIN: '',
    telephone: '',
  });
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTenant(id, data);
      navigate('/tenants');
    } catch (error) {
      setErrors(error.response?.data?.message);
    }
  };

  // get tenants informations
  useEffect(() => {
    async function fetchTenant() {
      try {
        const { tenant } = await getTenantById(id);
        setData(tenant);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 404) {
          setNotFound(true);
        }
        setErrors(error.response.data?.message);
      }
    }
    fetchTenant();
  }, [id]);

  if (notFound) {
    return <NotFound />;
  }

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Oval type="ThreeDots" color="#00BFFF" secondaryColor="#00BEEE" height={80} width={80} />
      </div>
    );

  return (
    <div className="wrapper">
      {/* two areas, one for showing tenant informations, and other contains a for to update the tenant information */}
      <div>
        <h1 className="text-2xl font-bold underline">Tenant Details</h1>
        <div className="mt-4">
          <ul>
            <li>
              <span>First Name: </span>
              <span className="font-bold">{data.firstName}</span>
            </li>
            <li>
              <span>Last Name: </span>
              <span className="font-bold">{data.lastName}</span>
            </li>
            <li>
              <span>CIN: </span>
              <span className="font-bold">{data.CIN}</span>
            </li>
            <li>
              <span>Telephone: </span>
              <span className="font-bold">{data.telephone}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold underline">Update Tenant</h1>
        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! &nbsp; &nbsp;</strong>
            <span className="block sm:inline">{errors}</span>
          </div>
        )}
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <Input
              showLabel={true}
              onChange={handleChange}
              value={data.firstName}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
            <Input
              showLabel={true}
              onChange={handleChange}
              value={data.lastName}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
            <Input
              showLabel={true}
              onChange={handleChange}
              value={data.CIN}
              type="text"
              name="CIN"
              id="CIN"
              placeholder="CIN"
            />
            <Input
              showLabel={true}
              onChange={handleChange}
              value={data.telephone}
              type="text"
              name="telephone"
              id="telephone"
              placeholder="Telephone"
            />
          </div>
          <div className="mt-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantDetails;
