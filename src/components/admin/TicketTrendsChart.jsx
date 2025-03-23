import React from 'react';
import Chart from 'react-apexcharts';

const TicketTrendsChart = ({ ticketCreationByMonth }) => {
  const chartOptions = {
    chart: {
      id: 'ticket-trend',
      type: 'line',
      height: 280,
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: ['#25A18E'],
    stroke: {
      curve: 'smooth',
      width: 3
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
    },
    markers: {
      size: 5,
      colors: ['#25A18E'],
      strokeColors: '#fff',
      strokeWidth: 2
    }
  };

  const series = [{
    name: 'Tickets',
    data: ticketCreationByMonth
  }];

  return (
    <Chart 
      options={chartOptions} 
      series={series} 
      type="line" 
      height={280} 
    />
  );
};

export default TicketTrendsChart;