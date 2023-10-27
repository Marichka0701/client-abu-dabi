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
                // ticks: {
                //     color: '#9CA8B4',
                //     fontFamily: 'Inter, sans-serif',
                //     fontSize: 12,
                //     fontWeight: 600,
                //     lineHeight: '18px',
                //     letterSpacing: '0.016px',
                // },
            }
        },
        aspectRatio: 0, // Змініть це значення на вашу потребу
        maintainAspectRatio: false, // Забороніть зберігати співвідношення сторін
    };

    // const options = {
    //     scales: {
    //         x: [
    //             {
    //                 grid: {
    //                     display: false, // Вимкнути відображення сітки на осі X
    //                 },
    //             },
    //         ],
    //         y: [
    //             {
    //                 grid: {
    //                     display: false, // Вимкнути відображення сітки на осі Y
    //                 },
    //             },
    //         ],
    //         // display: false,
    //         xAxes: [
    //             {
    //
    //                 // ticks: {
    //                 //     fontFamily: 'Arial', // Змінити шрифт для місяців (labels) на осі X
    //                 //     fontSize: 14, // Змінити розмір шрифту
    //                 //     fontColor: 'red', // Змінити кольору шрифту
    //                 //     fontStyle: 'italic', // Змінити стиль шрифту
    //                 //     // Додаткові стилі шрифту...
    //                 // },
    //                 // barPercentage: 0.7
    //             },
    //         ],
    //     },
    // };

    return (
        <div className={styles.bar}>
            <Bar options={options} data={chartData}/>
        </div>
    );
}

export default BarChart;
