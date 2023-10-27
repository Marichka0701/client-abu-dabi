import React, {useEffect, useState} from 'react';

import styles from './DroneInfo.module.scss';
import whiteDroneInfo from '../../constants/images/white-drone-info.png';
import blackDroneInfo from '../../constants/images/black-drone-info.png';
import {useSelector} from "react-redux";

const DroneInfo = ({drone, type}) => {
    useEffect(() => {

    }, [drone]);

    const {selectedDroneId} = useSelector(state => state.dronesHistory);

    // console.log(drone)

    // const [elapsedTime, setElapsedTime] = useState("0:0:0");
    //
    // useEffect(() => {
    //     if (drone?.placementTime) {
    //         const startTime = new Date(drone.placementTime).getTime();
    //
    //         if (!isNaN(startTime)) { // Перевірка на коректність дати
    //             const intervalId = setInterval(() => {
    //                 const currentTime = new Date().getTime();
    //                 const timeDifference = currentTime - startTime;
    //
    //                 // Перетворюємо часовий інтервал в години, хвилини, секунди
    //                 const hours = Math.floor(timeDifference / 3600000);
    //                 const minutes = Math.floor((timeDifference % 3600000) / 60000);
    //                 const seconds = Math.floor((timeDifference % 60000) / 1000);
    //
    //                 setElapsedTime(`${hours}:${minutes}:${seconds}`);
    //             }, 1000); // Оновлюємо кожну секунду
    //
    //             return () => {
    //                 clearInterval(intervalId); // Прибрати інтервал при розмонтуванні компонента
    //             };
    //         }
    //     }
    // }, [drone]);

    // const getCountUpDifference = (startTime, currentTime) => {
    //     const startTimeInMs = new Date(startTime).getTime();
    //     const currentTimeInMs = new Date(currentTime).getTime();
    //     console.log(startTimeInMs, currentTimeInMs);
    //     const difference = currentTimeInMs - startTimeInMs;
    //     console.log(difference);
    // }
    //
    // getCountUpDifference(drone?.placementTime, new Date());
    // const getCountUpDifference = (startTime) => {
    //     const startTimeInMs = new Date(startTime).getTime();
    //     const currentTime = new Date();
    //
    //     // Оновлення відображення кожну секунду
    //     const updateDisplay = () => {
    //         const currentTimeInMs = new Date().getTime();
    //         const difference = currentTimeInMs - startTimeInMs;
    //
    //         // Перетворення різниці часу у секунди
    //         const secondsDifference = Math.floor(difference / 1000);
    //
    //         // Оновлюємо відображення різниці у секундах
    //         console.log(secondsDifference);
    //     }
    //
    //     // Оновлювати відображення кожну секунду
    //     const intervalId = setInterval(updateDisplay, 1000);
    //
    //     // Зупинити оновлення після закінчення дрону
    //     const stopUpdating = () => {
    //         clearInterval(intervalId);
    //     }
    //
    //     return stopUpdating;
    // }

    // const [seconds, setSeconds] = useState(0);
    // const [minutes, setMinutes] = useState(0);
    //
    // useEffect(() => {
    //     if (drone?.placementTime) {
    //         const startTime = new Date(drone.placementTime).getTime();
    //
    //         if (!isNaN(startTime)) {
    //             const intervalId = setInterval(() => {
    //                 const currentTime = new Date().getTime();
    //                 const timeDifference = currentTime - startTime;
    //
    //                 if (seconds <= 60) {
    //                     setSeconds((timeDifference / 1000).toFixed(0)); // Перетворюємо мілісекунди на секунди
    //                 } else {
    //                     setSeconds(0);
    //                     setMinutes(minutes + 1);
    //                 }
    //             }, 1000);
    //
    //             return () => {
    //                 clearInterval(intervalId);
    //             };
    //         }
    //     }
    // }, [drone]);

    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (drone?.placementTime) {
            const startTime = new Date(drone.placementTime).getTime();

            if (!isNaN(startTime)) {
                const intervalId = setInterval(() => {
                    const currentTime = new Date().getTime();
                    const timeDifference = currentTime - startTime;
                    setElapsedTime(Math.floor(timeDifference / 1000));
                }, 1000);

                return () => {
                    clearInterval(intervalId);
                };
            }
        }
    }, [drone]);

    const formatElapsedTime = (elapsedTime) => {
        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor((elapsedTime / 60) % 60);
        let hours = Math.floor(elapsedTime / 3600);

        return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`;
    };

    return (
        <div
            // onClick={() => handleSidebarItemClick(drone.droneId)}
            className={`${styles.droneInfo} ${selectedDroneId === drone?.droneId ? styles.active : ''}`}
        >
            <div className={styles.droneInfo_titleContainer}>
                <img src={type === 'white' ? whiteDroneInfo : blackDroneInfo} alt="drone icon"/>
                <div className={styles.droneInfo_titleContainer_title}>
                    <h3>{drone?.droneId}</h3>
                    <p>{type === 'white' ? 'Mavic JS' : 'Unknown'}</p>
                </div>
            </div>

            <div className={styles.droneInfo_info}>
                <div className={styles.droneInfo_info_session}>
                    <p className={styles.subtitle}>Session:</p>
                    {/*<p className={styles.info}>{`${minutes}m ${seconds} sec`}</p>*/}
                    <p className={styles.info}>{formatElapsedTime(elapsedTime)}</p>
                </div>

                <div className={styles.droneInfo_info_onlineFrom}>
                    <p className={styles.subtitle}>Online from:</p>
                    <p className={styles.info}>{new Date(drone?.placementTime).toLocaleTimeString()}</p>
                </div>

                <div className={styles.droneInfo_info_startedGps}>
                    <p className={styles.subtitle}>Started GPS:</p>
                    {
                        drone.startPosition &&
                        <p className={styles.info}>{drone?.startPosition[0]?.toFixed(6)}, {drone?.startPosition[1]?.toFixed(6)}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default DroneInfo;