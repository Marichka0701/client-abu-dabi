import React, {useState} from 'react';

import styles from './MainLayout.module.scss';
import AppMapBox from '../../components/AppMapBox/AppMapBox';
import MiniSidebar from "../../components/MiniSidebar/MiniSidebar";
import SidebarDrones from "../../components/SidebarDrones/SidebarDrones";
import History from "../../components/History/History";
import {barChartData} from "../../constants/barChartData";
import Charts from "../../components/Charts/Charts";

const MainLayout = () => {
    const [selectedOption, setSelectedOption] = useState('menu');

    const [userData, setUserData] = useState({
        labels: barChartData.map((data) => data.year),
        datasets: [
            {
                label: "",
                data: barChartData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });


    return (
        <div className={styles.mainLayout}>
            <MiniSidebar
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />

            {
                selectedOption === 'menu' && <Charts chartData={userData}/>
            }

            {
                selectedOption === 'drone' && <SidebarDrones/>
            }

            {
                selectedOption === 'history' && <History/>
            }
            <AppMapBox selectedOption={selectedOption}/>
        </div>
    );
};

export default MainLayout;