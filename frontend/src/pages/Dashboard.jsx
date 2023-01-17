import { useState, useEffect } from 'react';
import { getStatistics } from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    apartments: 0,
    buildings: 0,
    tenants: 0,
    payments: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getStatistics();
      setStats(response);
    }
    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Hello Admin</h2>

            <p className="mt-4 text-gray-500 sm:text-xl">
              This is the stastiques of your properties and buildings as well as the payments and incomes
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total apartments</dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{stats.apartments}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total buildings</dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{stats.buildings}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total tenants</dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{stats.tenants}</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total factures</dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{stats.payments}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
};
export default Dashboard;
