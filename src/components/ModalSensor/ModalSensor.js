import React from 'react';

import styles from './ModalSensor.module.scss';

const ModalSensor = ({selectedSensor}) => {
    const {coordinates, height, placementTime, placementDate} = selectedSensor;

    return (
        <div className={styles.modalSensor}>
            <h2>Sensor #123</h2>

            <div className={styles.modalSensor_sensor}>
                <div className={styles.modalSensor_sensor_position}>
                    <p className={styles.subtitle}>GPS Position:</p>
                    <p className={styles.info}>{coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}</p>
                </div>

                <div className={styles.modalSensor_sensor_height}>
                    <p className={styles.subtitle}>Height:</p>
                    <p className={styles.info}>{height}</p>
                </div>

                <div className={styles.modalSensor_sensor_placementTime}>
                    <p className={styles.subtitle}>Placement Time:</p>
                    <p className={styles.info}>{placementTime}</p>
                </div>

                <div className={styles.modalSensor_sensor_placementDate}>
                    <p className={styles.subtitle}>Placement Date:</p>
                    <p className={styles.info}>{placementDate}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalSensor;