import React, {useEffect} from 'react';

import styles from './ModalSensor.module.scss';

const ModalSensor = ({selectedSensor}) => {
    const {coordinates, height, placementTime, placementDate} = selectedSensor;

    useEffect(() => {

    }, [selectedSensor])

    return (
        <div className={styles.modalSensor}>
            <h2>Sensor #123</h2>

            <div className={styles.modalSensor_sensor}>
                <div className={styles.modalSensor_sensor_position}>
                    <p className={styles.subtitle}>GPS Position:</p>
                    <p className={styles.info}>{coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}</p>
                    {/*<p className={styles.info}>74.342324, -123,324242 </p>*/}
                </div>

                <div className={styles.modalSensor_sensor_height}>
                    <p className={styles.subtitle}>Height:</p>
                    <p className={styles.info}>{height}</p>
                    {/*<p className={styles.info}>350m</p>*/}
                </div>

                <div className={styles.modalSensor_sensor_placementTime}>
                    <p className={styles.subtitle}>Placement Time:</p>
                    <p className={styles.info}>{placementTime}</p>
                    {/*<p className={styles.info}>07:39 AM</p>*/}
                </div>

                <div className={styles.modalSensor_sensor_placementDate}>
                    <p className={styles.subtitle}>Placement Date:</p>
                    <p className={styles.info}>{placementDate}</p>
                    {/*<p className={styles.info}>24.07.2023</p>*/}
                </div>
            </div>
        </div>
    );
};

export default ModalSensor;