import React, {useState} from 'react';

import styles from './Charts.module.scss';
import {LineChart} from "./LineChart/LineChart";
import AllDronesCharts from "./AllDronesCharts/AllDronesCharts";
import WhiteDronesCharts from "./WhiteDronesCharts/WhiteDronesCharts";
import BlackDronesCharts from "./BlackDronesCharts/BlackDronesCharts";

const Charts = () => {
    const [selectedChart, setSelectedChart] = useState('All drones');

    const titlesLineChart = [
        {title: 'Total', type: 'general'},
        {title: 'White', type: 'progress'},
        {title: 'Black', type: 'regress'}
    ];
    const numbersLineChart = ['2,860', '1,890', '1,390'];
    const labelLineChart = ['from previous month'];
    const percentageLineChart = ['2%', '60%', '40%'];

    return (
        <div className={styles.charts}>
            <div className={styles.charts_linear}>
                <h3>New Drones</h3>

                <div className={styles.charts_linear_content}>
                    {
                        titlesLineChart.map((item, index) =>
                            <LineChart
                                key={index}
                                type={item.type}
                                title={item.title}
                                number={numbersLineChart[index]}
                                description={labelLineChart[0]}
                                percentage={percentageLineChart[index]}
                            />
                        )
                    }
                </div>
            </div>

            <div className={styles.charts_bar}>
                <ul className={styles.charts_bar_options}>
                    <li
                        className={selectedChart === 'All drones' ? styles.active : ''}
                        onClick={() => setSelectedChart('All drones')}
                    >All Drones
                    </li>
                    <li
                        className={selectedChart === 'White drones' ? styles.active : ''}
                        onClick={() => setSelectedChart('White drones')}
                    >White Drones
                    </li>
                    <li
                        className={selectedChart === 'Black drones' ? styles.active : ''}
                        onClick={() => setSelectedChart('Black drones')}
                    >Black Drones
                    </li>
                </ul>

                {
                    selectedChart === 'All drones' && <AllDronesCharts/>
                }

                {
                    selectedChart === 'White drones' && <WhiteDronesCharts/>
                }

                {
                    selectedChart === 'Black drones' && <BlackDronesCharts/>
                }
            </div>
        </div>
    );
};

export default Charts;