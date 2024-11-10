import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Import necessary Highcharts modules
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';
import highchartsMore from 'highcharts/highcharts-more';
import { data as chartData } from './data.ts'; // Assuming data.ts contains the data

// Initialize Highcharts modules
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);
highchartsMore(Highcharts);

interface DataItem {
  enrollment_id: string;
  days_before_semester_start: number;
  GPA: string;
  GPA_category: 'High' | 'Medium' | 'Low';
  payment_method: 'Online' | 'Bank Transfer' | 'Cash';
}

const ECommerce: React.FC = () => {
  const [data, setData] = useState<DataItem[]>(chartData);

  useEffect(() => {
    setData(chartData);
  }, []);

  // Preprocess data for charts
  const scatterData = {
    labels: data.map(item => item.enrollment_id),
    datasets: [
      {
        label: 'GPA vs Days Before Semester Start',
        data: data.map(item => ({
          x: item.days_before_semester_start,
          y: parseFloat(item.GPA),
        })),
        backgroundColor: data.map(item => {
          if (item.GPA_category === 'High') return 'green';
          if (item.GPA_category === 'Medium') return 'yellow';
          return 'red';
        }),
      },
    ],
  };

  const lineData = {
    labels: Array.from({ length: 7 }, (_, i) => `Day ${i - 7}`),
    datasets: [
      {
        label: 'Average GPA Over Fee Submission Timeline',
        data: Array.from({ length: 7 }, (_, i) => {
          const filteredData = data.filter(
            item => item.days_before_semester_start === (i - 7)
          );
          const avgGPA = filteredData.length > 0 ? filteredData.map(item => parseFloat(item.GPA)).reduce((acc, curr) => acc + curr) / filteredData.length : 0;
          return avgGPA;
        }),
        borderColor: '#FF5733',
        fill: false,
      },
    ],
  };

  const barData = {
    labels: ['Online', 'Bank Transfer', 'Cash'],
    datasets: [
      {
        label: 'GPA Categories by Fee Submission Method',
        data: [
          data.filter(item => item.payment_method === 'Online').length,
          data.filter(item => item.payment_method === 'Bank Transfer').length,
          data.filter(item => item.payment_method === 'Cash').length,
        ],
        backgroundColor: ['#008000', '#FFD700', '#FF6347'],
      },
    ],
  };

  // Pie chart for GPA Category Distribution
  const pieData = {
    labels: ['High GPA', 'Medium GPA', 'Low GPA'],
    datasets: [
      {
        label: 'GPA Distribution',
        data: [
          data.filter(item => item.GPA_category === 'High').length,
          data.filter(item => item.GPA_category === 'Medium').length,
          data.filter(item => item.GPA_category === 'Low').length,
        ],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
      },
    ],
  };

  // Radar chart for GPA vs Payment Methods
  const radarData = {
    labels: ['Online', 'Bank Transfer', 'Cash'],
    datasets: [
      {
        label: 'Payment Methods vs GPA Category',
        data: [
          data.filter(item => item.payment_method === 'Online' && item.GPA_category === 'High').length,
          data.filter(item => item.payment_method === 'Bank Transfer' && item.GPA_category === 'Medium').length,
          data.filter(item => item.payment_method === 'Cash' && item.GPA_category === 'Low').length,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['High GPA', 'Medium GPA', 'Low GPA'],
    datasets: [
      {
        label: 'GPA Category Distribution',
        data: [
          data.filter(item => item.GPA_category === 'High').length,
          data.filter(item => item.GPA_category === 'Medium').length,
          data.filter(item => item.GPA_category === 'Low').length,
        ],
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
      },
    ],
  };

  // Highcharts configuration for Scatter plot
  const scatterChartOptions = {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    title: {
      text: 'GPA vs Days Before Semester Start',
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Days Before Semester Start',
      },
    },
    yAxis: {
      title: {
        text: 'GPA',
      },
    },
    series: [
      {
        name: 'GPA Data',
        data: data.map(item => [item.days_before_semester_start, parseFloat(item.GPA)]),
      },
    ],
  };

  // Highcharts configuration for Line chart
  const lineChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Average GPA Over Fee Submission Timeline',
    },
    xAxis: {
      categories: Array.from({ length: 7 }, (_, i) => `Day ${i - 7}`),
    },
    yAxis: {
      title: {
        text: 'Average GPA',
      },
    },
    series: [
      {
        name: 'Average GPA',
        data: Array.from({ length: 7 }, (_, i) => {
          const filteredData = data.filter(
            item => item.days_before_semester_start === (i - 7)
          );
          return filteredData.length > 0 ? filteredData.map(item => parseFloat(item.GPA)).reduce((acc, curr) => acc + curr) / filteredData.length : 0;
        }),
      },
    ],
  };

  // Highcharts configuration for Bar chart
  const barChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'GPA Categories by Fee Submission Method',
    },
    xAxis: {
      categories: ['Online', 'Bank Transfer', 'Cash'],
    },
    yAxis: {
      title: {
        text: 'Number of Students',
      },
    },
    series: [
      {
        name: 'GPA Categories',
        data: [
          data.filter(item => item.payment_method === 'Online').length,
          data.filter(item => item.payment_method === 'Bank Transfer').length,
          data.filter(item => item.payment_method === 'Cash').length,
        ],
        color: '#007bff',
      },
    ],
  };

  // Highcharts configuration for Pie chart
  const pieChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'GPA Category Distribution',
    },
    series: [
      {
        name: 'GPA Category',
        data: [
          ['High GPA', data.filter(item => item.GPA_category === 'High').length],
          ['Medium GPA', data.filter(item => item.GPA_category === 'Medium').length],
          ['Low GPA', data.filter(item => item.GPA_category === 'Low').length],
        ],
        colorByPoint: true,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={scatterChartOptions} />
      <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
      <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
      <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
    </div>
  );
};

export default ECommerce;
