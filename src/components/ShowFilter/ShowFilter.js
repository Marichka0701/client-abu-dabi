import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import './Switch.scss';
import styles from './ShowFilter.module.scss';

const ShowFilter = ({
                        whiteDronesChecked, blackDronesChecked, radarsChecked,
                        setWhiteDronesChecked, setBlackDronesChecked, setRadarsChecked
                    }) => {

    return (
        <div className={styles.showFilter}>
            <h2>Show on Map</h2>

            <div className={styles.showFilter_options}>
                <FormControlLabel
                    control={<Switch checked={whiteDronesChecked} onChange={() => setWhiteDronesChecked(!whiteDronesChecked)} />}
                    label="White Drones"
                />
                <FormControlLabel
                    control={<Switch checked={blackDronesChecked} onChange={() => setBlackDronesChecked(!blackDronesChecked)} />}
                    label="Black Drones"
                />
                <FormControlLabel
                    control={<Switch checked={radarsChecked} onChange={() => setRadarsChecked(!radarsChecked)} />}
                    label="Radars"
                />
            </div>
        </div>
    );
};

export default ShowFilter;