import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function LineChart({ data, total }) {
  useEffect(() => {
    const chart = new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Rents',
            borderColor: '#4A5568',
            data,
            fill: false,
            pointBackgroundColor: '#4A5568',
            borderWidth: '3',
            pointBorderWidth: '4',
            pointHoverRadius: '6',
            pointHoverBorderWidth: '8',
            pointHoverBorderColor: 'rgb(74,85,104,0.2)',
          },
        ],
      },
      options: {
        legend: {
          position: false,
        },
        scales: {
          y: {
            gridLines: {
              display: false,
            },
            display: false,
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="max-w-6xl">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="lg:flex w-full justify-between">
              <h3 className="text-gray-600 dark:text-gray-400 leading-5 text-base md:text-xl font-bold">
                Selling Overview
              </h3>
              <div className="flex items-center justify-between lg:justify-start mt-2 md:mt-4 lg:mt-0">
                <div className="lg:ml-14">
                  <div className="bg-gray-100 dark:bg-gray-700 ease-in duration-150 hover:bg-gray-200 pb-2 pt-1 px-3 rounded-sm">
                    <select className="text-xs text-gray-600 dark:text-gray-400 bg-transparent focus:outline-none">
                      <option className="leading-1">Year</option>
                      <option className="leading-1">2020</option>
                      <option className="leading-1">2019</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end mt-6">
              <h3 className="text-indigo-500 leading-5 text-lg md:text-2xl">{total} DH</h3>
            </div>
          </div>
          <div className="mt-6">
            <canvas id="myChart" width={1200} height={400} />
          </div>
        </div>
      </div>
    </div>
  );
}
