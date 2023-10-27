// import React, {useEffect, useState} from 'react';
// import ReactDOM from 'react-dom';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import './AppMapBox.scss';
// import './NavigationControl.scss';
// import {geoJson} from "../../constants/coordinatesSensor";
// import ModalSensor from "../ModalSensor/ModalSensor";
// import sensor from '../../constants/images/sensor.png';
// import {useDispatch, useSelector} from "react-redux";
// import {dronesHistoryActions} from "../../store/slices/dronesHistorySlice";
// import whiteDrone from "../../constants/images/white-drone.png";
// import blackDrone from "../../constants/images/black-drone.png";
// import selectedWhiteDrone from "../../constants/images/selected-white-drone.png";
// import ShowFilter from "../ShowFilter/ShowFilter";
//
//
// const AppMapBox = ({selectedOption}) => {
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [selectedSensor, setSelectedSensor] = useState({});
//
//     const [whiteDronesChecked, setWhiteDronesChecked] = useState(true);
//     const [blackDronesChecked, setBlackDronesChecked] = useState(true);
//     const [radarsChecked, setRadarsChecked] = useState(true);
//
//     // const [activeDrone, setActiveDrone] = useState({
//     //     droneId: null,
//     //     durationFlight: null,
//     //     startPosition: [],
//     //     endPosition: [],
//     //     minHeight: Math.floor(100 + Math.random() * (400 - 100)),
//     //     maxHeight: Math.floor(300 + Math.random() * (700 - 300)),
//     //     startDate: null,
//     //     endDate: null,
//     //     placementTime: null,
//     // });
//
//     // const {activeDrones, pastDrones, dronesHistory, selectedDroneId} = useSelector(state => state.dronesHistory);
//     const dispatch = useDispatch();
//
//
//     useEffect(() => {
//         mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
//
//         const map = new mapboxgl.Map({
//             container: 'map',
//             style: process.env.REACT_APP_MAPBOX_STYLE,
//             center: [process.env.REACT_APP_ABU_DABI_LONGITUDE, process.env.REACT_APP_ABU_DABI_LATITUDE], // абу дабі
//             zoom: 10.85,
//         });
//
//         const markers = geoJson.features;
//
//         for (const marker of markers) {
//             if (radarsChecked) {
//                 const el = document.createElement('div');
//                 el.className = 'marker';
//                 el.style.backgroundImage = `url(${sensor})`;
//
//                 el.addEventListener('mouseenter', () => {
//                     setModalIsOpen(true);
//                     setSelectedSensor(marker.properties.message);
//                 });
//
//                 el.addEventListener('mouseleave', () => {
//                     setModalIsOpen(false);
//                     setSelectedSensor(marker.properties.message);
//                 });
//
//                 const popupContent = document.createElement('div');
//
//                 ReactDOM.render(<ModalSensor selectedSensor={marker.properties.message}/>, popupContent);
//
//                 const popup = new mapboxgl.Popup({offset: 25}).setDOMContent(popupContent);
//
//                 new mapboxgl.Marker(el)
//                     .setLngLat(marker.geometry.coordinates)
//                     .addTo(map)
//                     .setPopup(popup);
//             }
//         }
//
//
//         map.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'bottom-right');
//
//         const AddWhiteDronesToMap = () => {
//             const addDroneToMap = () => {
//                 const placementTime = new Date();
//
//                 const astanaLatitude = 24.315 + Math.random() * (process.env.REACT_APP_ABU_DABI_LATITUDE - 24.315); // В межах міста абу дабі
//                 const astanaLongitude = 54.312 + Math.random() * (process.env.REACT_APP_ABU_DABI_LONGITUDE - 54.312); // В межах міста абу дабі
//
//                 const radius = Math.random() * 0.11; // Встановіть власне значення
//
//                 const pointAroundAstana = (angle) => {
//                     const newLatitude = astanaLatitude + Math.cos(angle) * radius;
//                     const newLongitude = astanaLongitude + Math.sin(angle) * radius;
//
//                     return {
//                         'type': 'Point',
//                         'coordinates': [newLongitude, newLatitude]
//                     };
//                 }
//
//                 const droneId = `drone_${Math.random().toString(36).substring(7)}`;
//
//
//                 map.on('click', droneId, (e) => {
//                     // Прибирання всіх коліщаток, окрім останнього вибраного
//                     const layers = map.getStyle().layers;
//                     layers.forEach((layer) => {
//                         if (layer.id.endsWith('_circle')) {
//                             map.removeLayer(layer.id);
//                         }
//                     });
//
//                     // Далі ви можете додати коліщатко для обраного дрона
//                     const features = map.queryRenderedFeatures(e.point, {layers: [droneId]});
//                     if (!features.length) {
//                         return;
//                     }
//
//                     console.log(`Клік на дроні з ідентифікатором: ${droneId}`);
//                     dispatch(dronesHistoryActions.setSelectedDroneId(droneId));
//                     console.log(droneId);
//
//                     const droneImageName = `drone_${droneId}`;
//                     map.loadImage(selectedWhiteDrone, (error, image) => {
//                         if (error)
//                             throw error;
//
//                         map.addImage(droneImageName, image);
//                         map.addLayer({
//                             'id': droneId + '_circle',
//                             'source': droneId,
//                             'type': 'symbol',
//                             'layout': {
//                                 'icon-image': droneImageName,
//                                 'icon-size': 0.5,
//                             },
//                         });
//                     });
//
//                 });
//
//                 dispatch(dronesHistoryActions.setWhiteDrones({
//                     type: 'white',
//                     droneId,
//                     startPosition: [astanaLongitude, astanaLatitude],
//                     placementTime,
//                 }));
//
//                 map.addSource(droneId, {
//                     'type': 'geojson',
//                     'data': pointAroundAstana(0)
//                 });
//
//                 map.loadImage(whiteDrone, (error, image) => {
//                     if (error)
//                         throw error;
//
//                     map.addImage(droneId, image);
//                     map.addLayer({
//                         'id': droneId,
//                         'source': droneId,
//                         'type': 'symbol',
//                         'layout': {
//                             'icon-image': droneId,
//                             'icon-size': 0.5,
//                         },
//                     });
//                 });
//
//                 const animateMarker = (timestamp) => {
//                     map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));
//
//                     requestAnimationFrame(animateMarker);
//                 }
//
//                 animateMarker(0);
//
//                 const randomTimeout = Math.random() * (80000 - 40000) + 40000;
//                 setTimeout(() => {
//                     const endTime = new Date();
//
//                     dispatch(dronesHistoryActions.removeWhiteDrones(droneId));
//                     dispatch(dronesHistoryActions.setPastDrones({
//                         type: 'white',
//                         droneId,
//                         startPosition: [astanaLongitude, astanaLatitude],
//                         placementTime,
//                         droneName: 'Mavic JS',
//                         maxHeight: Math.floor(300 + Math.random() * (700 - 300)),
//                         minHeight: Math.floor(100 + Math.random() * (400 - 100)),
//                         endTime,
//                     }));
//
//                     // map.removeLayer(droneId + '_border');
//                     map.removeLayer(droneId);
//                     map.removeLayer(droneId + '_circle');
//                     map.removeSource(droneId);
//
//                     addDroneToMap();
//                 }, randomTimeout);
//             };
//
//             map.on('style.load', () => {
//                 // Викликаємо функцію для додавання першого дрону після завантаження стилю
//                 addDroneToMap();
//
//                 // Встановлюємо інтервал для появи наступних дронів
//                 setInterval(addDroneToMap, Math.random() * (40000 - 80000) + 80000);
//             });
//         };
//
//
//         const AddBlackDronesToMap = () => {
//             const addDroneToMap = (radius) => {
//                 const astanaLatitude = 24.315 + Math.random() * (24.414 - 24.315); // В межах міста абу дабі
//                 const astanaLongitude = 54.312 + Math.random() * (54.429 - 54.312); // В межах міста абу дабі
//
//                 const pointAroundAstana = (angle) => {
//                     const newLatitude = astanaLatitude + Math.cos(angle) * radius;
//                     const newLongitude = astanaLongitude + Math.sin(angle) * radius;
//
//                     return {
//                         'type': 'Point',
//                         'coordinates': [newLongitude, newLatitude]
//                     };
//                 }
//
//                 const droneId = `drone_${Math.random().toString(36).substring(7)}`;
//
//                 const placementTime = new Date(); // Генерувати унікальний час розміщення
//
//                 dispatch(dronesHistoryActions.setBlackDrones({
//                     type: 'black',
//                     droneId,
//                     startPosition: [astanaLongitude, astanaLatitude],
//                     placementTime,
//                 }));
//
//                 map.addSource(droneId, {
//                     'type': 'geojson',
//                     'data': pointAroundAstana(0)
//                 });
//
//                 map.loadImage(blackDrone, (error, image) => {
//                     if (error)
//                         throw error;
//                     map.addImage(droneId, image);
//                     map.addLayer({
//                         'id': droneId,
//                         'source': droneId,
//                         'type': 'symbol',
//                         'layout': {
//                             'icon-image': droneId,
//                             'icon-size': 0.5,
//                         }
//                     });
//                 });
//
//                 const animateMarker = (timestamp) => {
//                     map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));
//
//                     requestAnimationFrame(animateMarker);
//                 }
//
//                 animateMarker(0);
//
//                 const randomTimeout = Math.random() * (80000 - 40000) + 40000;
//                 blackDronesChecked && setTimeout(() => {
//                     const endTime = new Date();
//
//                     dispatch(dronesHistoryActions.removeBlackDrones(droneId));
//                     dispatch(dronesHistoryActions.setPastDrones({
//                         placementTime,
//                         droneName: 'Mavic JS',
//                         maxHeight: Math.floor(300 + Math.random() * (700 - 300)),
//                         minHeight: Math.floor(100 + Math.random() * (400 - 100)),
//                         endTime,
//                         type: 'black',
//                         droneId,
//                         startPosition: [astanaLongitude, astanaLatitude],
//                     }));
//
//                     map.removeLayer(droneId);
//                     map.removeSource(droneId);
//
//                     addDroneToMap(radius);
//                 }, randomTimeout);
//             };
//
//             map.on('style.load', () => {
//                 setInterval(() => {
//                     addDroneToMap(Math.random() * (0.1 - 0.05) + 0.05);
//                 }, Math.random() * (80000 - 40000) + 40000);
//             });
//         };
//
//
//         whiteDronesChecked && AddWhiteDronesToMap()
//
//         // blackDronesChecked && AddBlackDronesToMap()
//
//     }, [blackDronesChecked, whiteDronesChecked, radarsChecked]);
//
//     return (
//         <>
//             <div
//                 style={{opacity: selectedOption === 'menu' ? '0' : '1'}}
//                 className={'appMap'}
//                 id={'map'}
//             >
//                 <ShowFilter
//                     blackDronesChecked={blackDronesChecked}
//                     whiteDronesChecked={whiteDronesChecked}
//                     radarsChecked={radarsChecked}
//                     setBlackDronesChecked={setBlackDronesChecked}
//                     setWhiteDronesChecked={setWhiteDronesChecked}
//                     setRadarsChecked={setRadarsChecked}
//                 />
//             </div>
//             {/*<div style={{display: selectedOption === 'menu' ? 'none' : 'flex'}} className={'appMap'} id={'map'}></div>*/}
//         </>
//     );
// };
//
// export default AppMapBox;
//


import React, {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './AppMapBox.scss';
import './NavigationControl.scss';
import {geoJson} from '../../constants/coordinatesSensor';
import ModalSensor from '../ModalSensor/ModalSensor';
import sensor from '../../constants/images/sensor.png';
import {useDispatch, useSelector} from 'react-redux';
import {dronesHistoryActions} from '../../store/slices/dronesHistorySlice';
import whiteDrone from '../../constants/images/white-drone.png';
import blackDrone from '../../constants/images/black-drone.png';
import selectedWhiteDrone from '../../constants/images/selected-white-drone.png';
import ShowFilter from '../ShowFilter/ShowFilter';

const AppMapBox = ({selectedOption}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState({});
    const [whiteDronesChecked, setWhiteDronesChecked] = useState(true);
    const [blackDronesChecked, setBlackDronesChecked] = useState(true);
    const [radarsChecked, setRadarsChecked] = useState(true);
    const mapRef = useRef(null);

    const [radarsLoaded, setRadarsLoaded] = useState(false);

    console.log(radarsChecked)

    const dispatch = useDispatch();

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: 'map',
                style: process.env.REACT_APP_MAPBOX_STYLE,
                center: [process.env.REACT_APP_ABU_DABI_LONGITUDE, process.env.REACT_APP_ABU_DABI_LATITUDE],
                zoom: 10.85,
            });

            mapRef.current.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'bottom-right');
        }

        const map = mapRef.current;

        const markers = geoJson.features;

        for (const marker of markers) {
            const el = document.createElement('div');
            el.style.backgroundImage = `url(${sensor})`;

            if (radarsChecked) {
                el.className = 'marker';

                if (!radarsLoaded) {
                    el.addEventListener('mouseenter', () => {
                        setModalIsOpen(true);
                        setSelectedSensor(marker.properties.message);
                    });

                    el.addEventListener('mouseleave', () => {
                        setModalIsOpen(false);
                        setSelectedSensor(marker.properties.message);
                    });

                    const popupContent = document.createElement('div');

                    ReactDOM.render(<ModalSensor selectedSensor={marker.properties.message}/>, popupContent);

                    const popup = new mapboxgl.Popup({offset: 25}).setDOMContent(popupContent);

                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .addTo(map)
                        .setPopup(popup);

                    setRadarsLoaded(true);
                }
            }
        }

        const element = document.getElementsByClassName('marker');
        if (radarsLoaded) {
            for (const item of element) {
                if (!radarsChecked) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            }
        }

        const AddWhiteDronesToMap = () => {
            const addDroneToMap = () => {
                const placementTime = new Date();

                const astanaLatitude = 24.315 + Math.random() * (process.env.REACT_APP_ABU_DABI_LATITUDE - 24.315); // В межах міста абу дабі
                const astanaLongitude = 54.312 + Math.random() * (process.env.REACT_APP_ABU_DABI_LONGITUDE - 54.312); // В межах міста абу дабі

                const radius = Math.random() * 0.11; // Встановіть власне значення

                const pointAroundAstana = (angle) => {
                    const newLatitude = astanaLatitude + Math.cos(angle) * radius;
                    const newLongitude = astanaLongitude + Math.sin(angle) * radius;

                    return {
                        'type': 'Point',
                        'coordinates': [newLongitude, newLatitude]
                    };
                }

                const droneId = `drone_${Math.random().toString(36).substring(7)}`;

                mapRef.current.on('click', droneId, (e) => {
                    // Прибирання всіх коліщаток, окрім останнього вибраного
                    const layers = mapRef.current.getStyle().layers;
                    layers.forEach((layer) => {
                        if (layer.id.endsWith('_circle')) {
                            mapRef.current.removeLayer(layer.id);
                        }
                    });

                    // Далі ви можете додати коліщатко для обраного дрона
                    const features = mapRef.current.queryRenderedFeatures(e.point, {layers: [droneId]});
                    if (!features.length) {
                        return;
                    }

                    console.log(`Клік на дроні з ідентифікатором: ${droneId}`);
                    dispatch(dronesHistoryActions.setSelectedDroneId(droneId));
                    console.log(droneId);

                    const droneImageName = `drone_${droneId}`;
                    mapRef.current.loadImage(selectedWhiteDrone, (error, image) => {
                        if (error)
                            throw error;

                        mapRef.current.addImage(droneImageName, image);
                        mapRef.current.addLayer({
                            'id': droneId + '_circle',
                            'source': droneId,
                            'type': 'symbol',
                            'layout': {
                                'icon-image': droneImageName,
                                'icon-size': 0.5,
                            },
                        });

                        // if (whiteDronesChecked) {
                        //     mapRef.current.setLayoutProperty(droneId + '_circle', 'visibility', 'none');
                        // } else {
                        //     mapRef.current.setLayoutProperty(droneId + '_circle', 'visibility', 'visible');
                        // }
                    });

                });

                dispatch(dronesHistoryActions.setWhiteDrones({
                    type: 'white',
                    droneId,
                    startPosition: [astanaLongitude, astanaLatitude],
                    placementTime,
                }));

                mapRef.current.addSource(droneId, {
                    'type': 'geojson',
                    'data': pointAroundAstana(0)
                });

                mapRef.current.loadImage(whiteDrone, (error, image) => {
                    if (error)
                        throw error;

                    mapRef.current.addImage(droneId, image);
                    mapRef.current.addLayer({
                        'id': droneId,
                        'source': droneId,
                        'type': 'symbol',
                        'layout': {
                            'icon-image': droneId,
                            'icon-size': 0.5,
                            // 'visibility': whiteDronesChecked ? 'visible' : 'none',
                        },
                    });

                    // setTimeout(() => {
                    if (whiteDronesChecked) {
                        mapRef.current.setLayoutProperty(droneId, 'visibility', 'visible');
                    } else {
                        mapRef.current.setLayoutProperty(droneId, 'visibility', 'none');
                    }
                    // }, 0);
                });

                const animateMarker = (timestamp) => {
                    mapRef.current.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));

                    requestAnimationFrame(animateMarker);
                }

                animateMarker(0);

                const randomTimeout = Math.random() * (80000 - 40000) + 40000;
                setTimeout(() => {
                    const endTime = new Date();

                    dispatch(dronesHistoryActions.removeWhiteDrones(droneId));
                    dispatch(dronesHistoryActions.setPastDrones({
                        type: 'white',
                        droneId,
                        startPosition: [astanaLongitude, astanaLatitude],
                        placementTime,
                        droneName: 'Mavic JS',
                        maxHeight: Math.floor(300 + Math.random() * (700 - 300)),
                        minHeight: Math.floor(100 + Math.random() * (400 - 100)),
                        endTime,
                    }));

                    mapRef.current.removeLayer(droneId + '_border');
                    mapRef.current.removeLayer(droneId);
                    mapRef.current.removeLayer(droneId + '_circle');
                    mapRef.current.removeSource(droneId);

                    addDroneToMap();
                }, randomTimeout);
            };

            mapRef.current.on('style.load', () => {
                // Викликаємо функцію для додавання першого дрону після завантаження стилю
                addDroneToMap();

                // Встановлюємо інтервал для появи наступних дронів
                setInterval(addDroneToMap, Math.random() * (40000 - 80000) + 80000);
            });
        };

        if (whiteDronesChecked && mapRef.current) {
            // AddWhiteDronesToMap();
            setTimeout(() => {
            const map = mapRef.current;
            // console.log(map?.getStyle())
            const droneLayers = map.getStyle().layers.filter(layer => layer.id.startsWith('drone_'));
                for (const layer of droneLayers) {
                    console.log(layer)
                    map.setLayoutProperty(layer.id, 'visibility', 'visible');
                }
            }, 50)

            // if (!!map) {
            //     console.log(map?.getStyle())
            //     const droneLayers = map.getStyle().layers.filter(layer => layer.id.startsWith('drone_'));
            //     for (const layer of droneLayers) {
            //         console.log(layer)
            //         map.setLayoutProperty(layer.id, 'visibility', 'visible');
            //     }
            // }
        } else {
            const map = mapRef.current;
            const droneLayers = map.getStyle().layers.filter(layer => layer.id.startsWith('drone_'));
            for (const layer of droneLayers) {
                map.setLayoutProperty(layer.id, 'visibility', 'none');
            }
        }

        // if (whiteDronesChecked) {
        //     // AddWhiteDronesToMap();
        //     const map = mapRef.current;
        //     if (map && map.isStyleLoaded()) {
        //         const droneLayers = map.getStyle().layers.filter(layer => layer.id.startsWith('drone_'));
        //         for (const layer of droneLayers) {
        //             console.log(layer)
        //             // map.setLayoutProperty(layer.id, 'visibility', 'visible');
        //         }
        //     }
        // } else {
        //     const map = mapRef.current;
        //     if (map && map.isStyleLoaded()) {
        //         const droneLayers = map.getStyle().layers.filter(layer => layer.id.startsWith('drone_'));
        //         for (const layer of droneLayers) {
        //             map.setLayoutProperty(layer.id, 'visibility', 'none');
        //         }
        //     }
        // }


        const AddBlackDronesToMap = () => {
            // Решта вашого коду для чорних дронів
        };

        AddWhiteDronesToMap();
        // blackDronesChecked && AddBlackDronesToMap();
    }, [blackDronesChecked, whiteDronesChecked, radarsChecked]);

    return (
        <>
            <div style={{opacity: selectedOption === 'menu' ? '0' : '1'}} className={'appMap'} id={'map'}>
                <ShowFilter
                    blackDronesChecked={blackDronesChecked}
                    whiteDronesChecked={whiteDronesChecked}
                    radarsChecked={radarsChecked}
                    setBlackDronesChecked={setBlackDronesChecked}
                    setWhiteDronesChecked={setWhiteDronesChecked}
                    setRadarsChecked={setRadarsChecked}
                />
            </div>
        </>
    );
};

export default AppMapBox;

