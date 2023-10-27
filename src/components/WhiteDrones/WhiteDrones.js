import React from 'react';
import {useSelector} from "react-redux";

import styles from './WhiteDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const WhiteDrones = () => {
    const {whiteDrones, selectedDroneId} = useSelector(state => state.dronesHistory);

    let sortedWhiteDrones;
    const sortWhiteDronesBySelectedDroneId = () => {
        const selectedDrone = whiteDrones.find(item => item.droneId === selectedDroneId);
        let otherObjects;

        if (!!selectedDrone) {
            otherObjects = whiteDrones.filter(item => item.droneId !== selectedDroneId);
            sortedWhiteDrones = [selectedDrone, ...otherObjects];
        } else {
            otherObjects = whiteDrones.filter(item => item.droneId !== selectedDroneId);
            sortedWhiteDrones = [...otherObjects];
        }
    }

    sortWhiteDronesBySelectedDroneId();

    return (
        <div className={styles.whiteDrones}>
            {
                sortedWhiteDrones &&
                sortedWhiteDrones.map((drone, index) => (
                    <DroneInfo
                        type={'white'}
                        key={index}
                        drone={drone}
                    />))
            }
        </div>
    );
};

export default WhiteDrones;