import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './charts.css';

const Charts = ({ data }) => {
  const [options, setOptions] = useState({
    chart: {
      type: 'pie',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    plotOptions: {
      pie: {
        // allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: `
            <b class="charts__name">
              {point.name}
            </b>
            : 
            <span class="charts__percentage">
              {point.percentage:.1f} %
            </span>
          `,
          style: {
            textShadow: false,
            textOutline: false,
          },
        },
      },
    },
    title: {
      text: 'Películas',
      style: {
        color: 'var(--baseColor)',
        fontSize: 32,
      },
    },
    series: [
      {
        name: 'Me gusta: ',
        data,
      },
    ],
  });

  return (
    <div className="charts">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Charts;
