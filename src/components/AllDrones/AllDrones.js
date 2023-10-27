import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

import styles from './AllDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const AllDrones = () => {
    const {whiteDrones, blackDrones, selectedDroneId} = useSelector(state => state.dronesHistory);
    let activeDrones = [...whiteDrones, ...blackDrones];

    useEffect(() => {

    }, [whiteDrones, blackDrones]);

    let sortedAllDrones;
    const sortAllDronesBySelectedDroneId = () => {
        const selectedDrone = activeDrones.find(item => item.droneId === selectedDroneId);
        let otherObjects;

        if (!!selectedDrone) {
            otherObjects = activeDrones.filter(item => item.droneId !== selectedDroneId);
            sortedAllDrones = [selectedDrone, ...otherObjects];
        } else {
            otherObjects = activeDrones.filter(item => item.droneId !== selectedDroneId);
            sortedAllDrones = [...otherObjects];
        }
    }

    sortAllDronesBySelectedDroneId();

    return (
        <div className={styles.allDrones}>
            {
                sortedAllDrones &&
                sortedAllDrones.map((drone, index) => (
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