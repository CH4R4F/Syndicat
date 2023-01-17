import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPayments, removePayment } from '../../utils/api';
import Button from '../../components/Button';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    async function fetchPayments() {
      try {
        const { payments } = await getAllPayments();
        setPayments(payments);
      } catch (error) {
        setErrors(error.response.data?.message);
      }
    }
    fetchPayments();
  }, []);

  async function handleDelete(id) {
    try {
      await removePayment(id);
      setPayments(payments.filter((payment) => payment._id !== id));
    } catch (error) {
      setErrors(error.response.data?.message);
    }
  }

  return (
    <div className="wrapper">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Link to="/payments/new">
          <Button text="Add Payment" />
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
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Tenant</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Apartment</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Amount</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Date</th>
              <th colSpan={2} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {!payments.length && (
              <tr>
                <td className="px-4 py-4 text-center" colSpan={5}>
                  No payments found
                </td>
              </tr>
            )}
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.tenant ? payment.tenant.firstName + ' ' + payment.tenant.lastName : ''}
                      </div>
                      <div className="text-sm text-gray-500">{payment.tenant?.CIN}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Link
                    to={`/apartments/${payment.apartment?.number}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {payment.apartment?.number}
                  </Link>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(payment.amount)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">Download Invoice</button>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* delete button */}
                  <button onClick={() => handleDelete(payment._id)} className="text-red-600 hover:text-red-900">
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

export default Payments;
