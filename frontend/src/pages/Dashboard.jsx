import React from 'react';
import LineChart from '../components/Chart';

const Dashboard = () => {
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
                <dt className="order-last text-lg font-medium text-gray-500">Total Income</dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">$4.8m</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total Apartments</dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">24</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total Buildings</dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">4</dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">Total Tenants</dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <LineChart data={[600, 400]} total={5399} />
    </>
  );
};
export default Dashboard;
