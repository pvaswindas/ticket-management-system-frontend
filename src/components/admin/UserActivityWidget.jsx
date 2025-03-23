import React from 'react';
import Chart from 'react-apexcharts';

const UserActivityWidget = ({ userActivityScore, activeUsers, inactiveUsers }) => {
  const chartOptions = {
    chart: {
      height: 200,
      type: 'radialBar',
      background: 'transparent',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        track: {
          background: '#374151'
        },
        dataLabels: {
          name: {
            color: '#9ca3af',
            fontFamily: 'Poppins, Arial, sans-serif',
            fontSize: '14px',
            offsetY: -10
          },
          value: {
            color: '#f3f4f6',
            fontSize: '24px',
            fontFamily: 'Poppins, Arial, sans-serif',
            fontWeight: 600
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#00A693'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    labels: ['Active Users'],
    colors: ['#004B49']
  };

  const series = [userActivityScore];

  return (
    <>
      <Chart 
        options={chartOptions} 
        series={series} 
        type="radialBar" 
        height={250} 
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <h4 className="text-gray-400 text-xs">Active Users</h4>
          <p className="text-xl font-semibold">{activeUsers.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <h4 className="text-gray-400 text-xs">Inactive Users</h4>
          <p className="text-xl font-semibold">{inactiveUsers.toLocaleString()}</p>
        </div>
      </div>
    </>
  );
};

export default UserActivityWidget;