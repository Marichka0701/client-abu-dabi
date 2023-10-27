import React from 'react';

import styles from './MiniSidebar.module.scss';
import logo from '../../constants/images/miniSidebar/abu-dabi.png';
import menu from '../../constants/images/miniSidebar/menu.png';
import menuActive from '../../constants/images/miniSidebar/menu-active.png';
import drone from '../../constants/images/miniSidebar/dron.png';
import droneActive from '../../constants/images/miniSidebar/dron-active.png';
import history from '../../constants/images/miniSidebar/history.png';
import historyActive from '../../constants/images/miniSidebar/history-active.png';

const MiniSidebar = ({selectedOption, setSelectedOption}) => {

    return (
        <div className={styles.miniSidebar}>
            <div className={styles.miniSidebar_ad}>
                <img src={logo} alt="abu dabi logo"/>
            </div>

            <div className={styles.miniSidebar_options}>
                <div
                    onClick={() => setSelectedOption('menu')}
                    className={`${styles.miniSidebar_options_item} ${selectedOption === 'menu' && styles.active}`}
                >
                    <img src={selectedOption === 'menu' ? menuActive : menu} alt="menu icon"/>
                </div>

                <div
                    onClick={() => setSelectedOption('drone')}
                    className={`${styles.miniSidebar_options_item} ${selectedOption === 'drone' && styles.active}`}
                >
                    <img src={selectedOption === 'drone' ? droneActive : drone} alt="drone icon"/>
                </div>

                <div
                    onClick={() => setSelectedOption('history')}
                    className={`${styles.miniSidebar_options_item} ${selectedOption === 'history' && styles.active}`}
                >
                    <img src={selectedOption === 'history' ? historyActive : history} alt="history icon"/>
                </div>
            </div>
        </div>
    );
};

export default MiniSidebar;