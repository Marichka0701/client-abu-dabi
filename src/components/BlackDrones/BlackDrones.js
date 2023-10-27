// import React from 'react';
// import {useSelector} from "react-redux";
//
// import styles from './BlackDrones.module.scss';
// import DroneInfo from "../DroneInfo/DroneInfo";
//
// const BlackDrones = () => {
//     const {blackDrones} = useSelector(state => state.dronesHistory);
//
//     return (
//         <div className={styles.blackDrones}>
//             {
//                 blackDrones &&
//                 blackDrones.map((drone, index) => (
//                     <DroneInfo
//                         type={'black'}
//                         key={index}
//                         drone={drone}
//                     />))
//             }
//         </div>
//     );
// };
//
// export default BlackDrones;


import React from 'react';
import {useSelector} from "react-redux";

import styles from './BlackDrones.module.scss';
import DroneInfo from "../DroneInfo/DroneInfo";

const BlackDrones = () => {
    const {blackDrones, selectedDroneId} = useSelector(state => state.dronesHistory);

    let sortedBlackDrones;
    const sortBlackDronesBySelectedDroneId = () => {
        const selectedDrone = blackDrones.find(item => item.droneId === selectedDroneId);
        let otherObjects;

        if (!!selectedDrone) {
            otherObjects = blackDrones.filter(item => item.droneId !== selectedDroneId);
            sortedBlackDrones = [selectedDrone, ...otherObjects];
        } else {
            otherObjects = blackDrones.filter(item => item.droneId !== selectedDroneId);
            sortedBlackDrones = [...otherObjects];
        }
    }

    sortBlackDronesBySelectedDroneId();

    return (
        <div className={styles.blackDrones}>
            {
                sortedBlackDrones &&
                sortedBlackDrones.map((drone, index) => (
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