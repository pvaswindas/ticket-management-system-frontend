import React from 'react';
import Chart from 'react-apexcharts';

const TicketStatusChart = ({ openTickets, inProgressTickets, resolvedTickets }) => {
  const chartOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    colors: ['#25A18E', '#004B49', '#01796F'],
    labels: ['Open', 'In-Progress', 'Resolved'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%'
        },
        expandOnClick: false,
        dataLabels: {
          offset: 0,
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Poppins, Arial, sans-serif',
      labels: {
        colors: '#9ca3af'
      }
    },
    stroke: {
      width: 5,
      colors: ['#2F363E']
    },
    tooltip: {
      theme: 'dark'
    }
  };

  const series = [openTickets, inProgressTickets, resolvedTickets];

  return (
    <Chart 
      options={chartOptions} 
      series={series} 
      type="donut" 
      height={280} 
    />
  );
};

export default TicketStatusChart;