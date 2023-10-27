import React from 'react';

import styles from './DetailedDroneInfo.module.scss';
import {getFlightDuration} from "../../constants/getFlightDuration";

const DetailedDroneInfo = ({setModalIsOpen, drone}) => {
    return (
       <div
           onClick={() => setModalIsOpen(false)}
           className={styles.detailedDroneInfo_container}
       >
           <div className={styles.detailedDroneInfo}>
               <div className={styles.detailedDroneInfo_titleContainer}>
                   <div>
                       <p>{`${new Date(drone?.placementTime).toLocaleDateString()}, ${new Date(drone?.placementTime).toLocaleTimeString()}`}</p>
                       <p>{drone?.droneName}</p>
                   </div>

                   <p>{getFlightDuration(drone?.placementTime, drone?.endTime)}</p>
               </div>

               <div className={styles.detailedDroneInfo_flightDetails}>
                   <div className={styles.detailedDroneInfo_flightDetails_icon}>
                       <div className={`${styles.dot} ${styles.green}`}></div>
                       <div className={styles.dash}></div>
                       <div className={`${styles.dot} ${styles.red}`}></div>
                   </div>

                   <div className={styles.detailedDroneInfo_flightDetails_coordinates}>
                       <p>{`${drone?.startPosition[0].toFixed(6)}, ${drone?.startPosition[1].toFixed(6)}`}</p>
                       {/*<p>71.413961, 51.140528 </p> // астана*/}
                       <p>46.885250, 24.556808</p>
                       {/*<p>54.382988, 24.400745 </p> // абу дабі*/}
                   </div>
               </div>

               <div className={styles.detailedDroneInfo_droneInfo}>
                   <div className={styles.left}>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>Drone Name</p>
                           <p className={styles.info}>{drone?.droneName}</p>
                       </div>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>Started Position</p>
                           <p className={styles.info}>{`${drone?.startPosition[0].toFixed(6)}, ${drone?.startPosition[1].toFixed(6)}`}</p>
                       </div>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>End Position</p>
                           <p className={styles.info}>46.885250, 24.556808</p>
                           {/*<p className={styles.info}>71.413961, 51.140528 </p> // astana*/}
                           {/*<p className={styles.info}>54.382988, 24.400745</p> // абу дабі*/}
                       </div>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>Max Height</p>
                           <p className={styles.info}>{drone?.maxHeight}</p>
                       </div>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>Min Height</p>
                           <p className={styles.info}>{drone?.minHeight}</p>
                       </div>
                   </div>

                   <div className={styles.right}>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>Drone ID Number</p>
                           <p className={styles.info}>{drone?.droneId}</p>
                       </div>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>Placement Time</p>
                           <p className={styles.info}>{new Date(drone?.placementTime).toLocaleTimeString()}</p>
                       </div>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>Start Date</p>
                           <p className={styles.info}>{new Date(drone?.placementTime).toLocaleDateString()}</p>
                       </div>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>End Date</p>
                           <p className={styles.info}>{new Date(drone?.endTime).toLocaleDateString()}</p>
                       </div>
                       <div className={styles.block}>
                           <p className={styles.subtitle}>Session Duration</p>
                           <p className={styles.info}>{getFlightDuration(drone?.placementTime, drone?.endTime)}</p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    );
};

export default DetailedDroneInfo;