import React, {useState} from 'react';

import BarChart from "../BarChart/BarChart";
import {whiteDronesChartStatistic} from "../../../constants/charts/staticticsChartWhiteDrones";

const WhiteDronesCharts = () => {
    const [chartData, setChartData] = useState({
        labels: whiteDronesChartStatistic.map((data) => data.month),
        datasets: [
            {
                label: '',
                data: whiteDronesChartStatistic.map((data) => data.userGain),
                backgroundColor: [
                    "#3B82F6",
                    "#CCDCFF",
                    "#3B82F6",
                    "#CCDCFF",
                    "#3B82F6",
                    "#CCDCFF",
                    "#3B82F6",
                    "#CCDCFF",
                ],
                borderRadius: '10'
            },
        ],
        options: {
            legend: {
                display: false,
            },
        },
    });

    return (
        <BarChart chartData={chartData}/>
    );
};

export default WhiteDronesCharts;