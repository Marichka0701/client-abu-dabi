import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import styles from './SidebarDrones.module.scss';
import AllDrones from "../AllDrones/AllDrones";
import WhiteDrones from "../WhiteDrones/WhiteDrones";
import BlackDrones from "../BlackDrones/BlackDrones";

const SidebarDrones = () => {
    const [selectedOption, setSelectedOption] = useState('All');

    const {whiteDrones, blackDrones} = useSelector(state => state.dronesHistory);
    let activeDrones = [...whiteDrones, ...blackDrones];

    useEffect(() => {

    }, [whiteDrones, blackDrones]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_top}>
                <div className={styles.sidebar_top_titleContainer}>
                    <h1>Live Tracking</h1>
                    <p>{activeDrones.length} drones on radar</p>
                </div>

                <ul className={styles.sidebar_top_options}>
                    <li
                        className={selectedOption === 'All' && styles.active}
                        onClick={() => setSelectedOption('All')}
                    >All</li>
                    <li
                        className={selectedOption === 'White' && styles.active}
                        onClick={() => setSelectedOption('White')}
                    >White</li>
                    <li
                        className={selectedOption === 'Black' && styles.active}
                        onClick={() => setSelectedOption('Black')}
                    >Black</li>
                </ul>

                {
                    selectedOption === 'All' && <AllDrones/>
                }

                {
                    selectedOption === 'White' && <WhiteDrones/>
                }

                {
                    selectedOption === 'Black' && <BlackDrones/>
                }
            </div>
        </div>
    );
};

export default SidebarDrones;