import React, {useEffect} from 'react';

import styles from './AllDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";
import {useSelector} from "react-redux";

const AllDrones = () => {
    const {whiteDrones, blackDrones} = useSelector(state => state.dronesHistory);
    let activeDrones = [...whiteDrones, ...blackDrones];

    useEffect(() => {

    }, [whiteDrones, blackDrones]);
    return (
        <div className={styles.allDrones}>
            {
                activeDrones &&
                activeDrones.map((drone, index) => (
                    <DroneInfo
                        type={drone.type}
                        key={index}
                        drone={drone}
                    />))
            }
        </div>
    );
};

export default AllDrones;