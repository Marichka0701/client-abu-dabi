import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

import styles from './WhiteDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const WhiteDrones = () => {
    const {whiteDrones, selectedDroneId} = useSelector(state => state.dronesHistory);

    // whiteDrones?.sort((a, b) => {
    //     if (a?.droneId === selectedDroneId) return -1; // Помістити об'єкт з id 42 на перше місце
    //     if (b?.droneId === selectedDroneId) return 1;
    //     // return 0;
    // });
    let sortedDrones;

    const sortDrones = (selectedDroneId, drones) => {
        return drones.reduce((acc, drone) => {
            if (drone.droneId === selectedDroneId) {
                return [drone, ...acc];
            } else {
                acc.push(drone);
                return acc;
            }
        }, []);
    };


    // useEffect(() => {
    //     sortedDrones = sortDrones(selectedDroneId, whiteDrones);
    // }, [whiteDrones, selectedDroneId]);

    // console.log(sortedDrones)
    let sortedWhiteDrones;
    const sortWhiteDrones = () => {
        const objWithSelectedDroneId = whiteDrones.find(item => item.droneId === selectedDroneId);
        let otherObjects;

        if (!!objWithSelectedDroneId) {
            console.log('true')
            otherObjects = whiteDrones.filter(item => item.droneId !== selectedDroneId);
            sortedWhiteDrones = [objWithSelectedDroneId, ...otherObjects];
        } else {
            console.log('false')
            otherObjects = whiteDrones.filter(item => item.droneId !== selectedDroneId);
            sortedWhiteDrones = [...otherObjects];
        }
    }

    sortWhiteDrones();
    console.log(sortedWhiteDrones)

    // console.log(whiteDrones)
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