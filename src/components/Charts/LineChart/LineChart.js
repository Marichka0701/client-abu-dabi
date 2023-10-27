import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
// import faker from "faker";
// import faker from 'faker';

import styles from './LineChart.module.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
    scales: {
        x: {
            display: false, // Вимкнути мітки збоку (ось X)
        },
        y: {
            display: false, // Вимкнути мітки знизу (ось Y)
        },
    },
    interaction: {
        mode: 'index', // Встановити режим взаємодії на 'index'
    },
    tooltips: {
        enabled: false, // Вимкнути вспливаючі вікна підказок (попапи)
    },
    // hover: false,
};

const generateRandomData = (length, min, max) => {
    return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1) + min));
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const appData = generateRandomData(labels.length, 0, 1000);

function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1'); // replace 'color1' with the start color of your gradient
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1'); // replace 'color2' with the end color of your gradient
    return gradient;
}

export const LineChart = ({type, title, number, percentage, description}) => {
    let backgroundColor = '';
    let borderColor = '';

    if (type === 'general') {
        backgroundColor = '#1A7EFF26';
        borderColor = '#2563EB';
    } else if (type === 'progress') {
        backgroundColor = '#0DE57630';
        borderColor = '#41B871';
    } else if (type === 'regress') {
        backgroundColor = '#F70D0D1F';
        borderColor = '#EF4444';
    }

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: title,
                data: appData,
                borderColor,
                backgroundColor,
            },
        ],
    };

    return (
        <div className={styles.lineChart}>
            <div className={styles.lineChart_description}>
                <p className={styles.lineChart_description_title}>{title}</p>
                <p className={styles.lineChart_description_number}>{number}</p>
                <p className={styles.lineChart_description_label}><span>{percentage}</span> {description}</p>
            </div>

            <div className={styles.lineChart_chart}>
                <Line options={options} data={data}/>
            </div>
        </div>
    )
}