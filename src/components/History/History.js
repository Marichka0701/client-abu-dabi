import React from 'react';
import {useSelector} from "react-redux";

import styles from './History.module.scss';
import HistoryItem from "./HistoryItem/HistoryItem";

const History = () => {
    const {pastDrones} = useSelector(state => state.dronesHistory);

    return (
        <div className={styles.history}>
            <h2>Flight History</h2>

            <div className={styles.history_list}>
                {
                    pastDrones.map((item, index) => <HistoryItem key={index} drone={item}/>)
                }
            </div>
        </div>
    );
};

export default History;