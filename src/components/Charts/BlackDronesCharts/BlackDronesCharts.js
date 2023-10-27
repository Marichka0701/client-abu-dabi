import React, {useState} from 'react';

import BarChart from "../BarChart/BarChart";
import {blackDronesChartStatistic} from "../../../constants/charts/staticticsChartBlackDrones";

const BlackDronesCharts = () => {
    const [chartData, setChartData] = useState({
        labels: blackDronesChartStatistic.map((data) => data.month),
        datasets: [
            {
                label: '',
                data: blackDronesChartStatistic.map((data) => data.userGain),
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

export default BlackDronesCharts;