import React from "react";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, BarElement, Title, Tooltip, Legend} from 'chart.js';

import styles from './BarChart.module.scss';

ChartJS.register(
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({chartData}) => {
    const options = {
        plugins: {
            legend: {
                labels: {
                    boxWidth: 0
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
            },
            y: {
                grid: {
                    display: false
                },
            }
        },
        aspectRatio: 0,
        maintainAspectRatio: false,
    };

    return (
        <div className={styles.bar}>
            <Bar options={options} data={chartData}/>
        </div>
    );
}

export default BarChart;
