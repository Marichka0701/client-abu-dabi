import React from 'react';
import {useSelector} from "react-redux";

import styles from './BlackDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const BlackDrones = () => {
    const {blackDrones} = useSelector(state => state.dronesHistory);

    return (
        <div className={styles.blackDrones}>
            {
                blackDrones &&
                blackDrones.map((drone, index) => (
                    <DroneInfo
                        type={'black'}
                        key={index}
                        drone={drone}
                    />))
            }
        </div>
    );
};

export default BlackDrones;