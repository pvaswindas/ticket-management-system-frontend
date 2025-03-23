import React from 'react';
import Chart from 'react-apexcharts';

const UserGrowthChart = ({ userGrowthByMonth }) => {
  const chartOptions = {
    chart: {
      id: 'user-growth',
      type: 'area',
      height: 280,
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: ['#166d5c'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#166d5c',
            opacity: 0.7
          },
          {
            offset: 100,
            color: '#0e9b8b',
            opacity: 0.3
          }
        ]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#9ca3af'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9ca3af'
        }
      }
    },
    grid: {
      borderColor: '#374151',
      strokeDashArray: 5
    },
    tooltip: {
      theme: 'dark'
    }
  };

  const series = [{
    name: 'Users',
    data: userGrowthByMonth
  }];

  return (
    <Chart 
      options={chartOptions} 
      series={series} 
      type="area" 
      height={280} 
    />
  );
};

export default UserGrowthChart;