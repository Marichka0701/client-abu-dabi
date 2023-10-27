import mapboxgl from "mapbox-gl";
import {dronesHistoryActions} from "../store/slices/dronesHistorySlice";
import whiteDrone from "./images/white-drone.png";

// export const AddWhiteDronesToMap = (dispatch) => {
//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4',
//         center: [71.413961, 51.140528],
//         zoom: 10.28,
//     });
//
//     const addDroneToMap = (radius) => {
//         const astanaLatitude = 51.1 + Math.random() * (51.25 - 51.1);
//         const astanaLongitude = 71.2 + Math.random() * (71.45 - 71.2);
//
//         const pointAroundAstana = (angle) => {
//             const newLatitude = astanaLatitude + Math.cos(angle) * radius;
//             const newLongitude = astanaLongitude + Math.sin(angle) * radius;
//
//             return {
//                 'type': 'Point',
//                 'coordinates': [newLongitude, newLatitude]
//             };
//         }
//
//         const droneId = `drone_${Math.random().toString(36).substring(7)}`;
//
//         dispatch(dronesHistoryActions.setWhiteDrones({
//             droneId,
//             startPosition: [astanaLongitude, astanaLatitude],
//             placementTime: new Date().toLocaleTimeString(),
//         }));
//
//         map.addSource(droneId, {
//             'type': 'geojson',
//             'data': pointAroundAstana(0)
//         });
//
//         map.loadImage(whiteDrone, (error, image) => {
//             if (error)
//                 throw error;
//             map.addImage(droneId, image);
//             map.addLayer({
//                 'id': droneId,
//                 'source': droneId,
//                 'type': 'symbol',
//                 'layout': {
//                     'icon-image': droneId,
//                     'icon-size': 0.5,
//                 }
//             });
//         });
//
//         const animateMarker = (timestamp) => {
//             map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));
//
//             requestAnimationFrame(animateMarker);
//         }
//
//         animateMarker(0);
//
//         const randomTimeout = Math.random() * (30000 - 3000) + 3000;
//         setTimeout(() => {
//             const endDate = new Date();
//
//             dispatch(dronesHistoryActions.removeWhiteDrones(droneId));
//             dispatch(dronesHistoryActions.setPastDrones({
//                 droneId,
//                 startPosition: [astanaLongitude, astanaLatitude],
//                 placementTime: new Date().toLocaleTimeString(),
//             }));
//
//             map.removeLayer(droneId);
//             map.removeSource(droneId);
//
//             addDroneToMap(radius);
//         }, randomTimeout);
//     };
//
//
//     map.on('style.load', () => {
//
//         setInterval(() => {
//             addDroneToMap(Math.random() * (0.2 - 0.09) + 0.09);
//         }, Math.random() * (20000 - 5000) + 5000);
//     })
// };
export const AddWhiteDronesToMap = (dispatch) => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/nazarvergyn/clnszvr7o00jk01pl5uuj47s4',
        center: [71.413961, 51.140528],
        zoom: 10.28,
    });

    const addDroneToMap = (radius) => {
        const astanaLatitude = 51.1 + Math.random() * (51.22 - 51.1);
        const astanaLongitude = 71.2 + Math.random() * (71.41 - 71.2);

        const pointAroundAstana = (angle) => {
            const newLatitude = astanaLatitude + Math.cos(angle) * radius;
            const newLongitude = astanaLongitude + Math.sin(angle) * radius;

            return {
                'type': 'Point',
                'coordinates': [newLongitude, newLatitude]
            };
        }

        const droneId = `drone_${Math.random().toString(36).substring(7)}`;

        const placementTime = new Date().toLocaleTimeString(); // Генерувати унікальний час розміщення

        dispatch(dronesHistoryActions.setWhiteDrones({
            type: 'white',
            droneId,
            startPosition: [astanaLongitude, astanaLatitude],
            placementTime,
        }));

        map.addSource(droneId, {
            'type': 'geojson',
            'data': pointAroundAstana(0)
        });

        map.loadImage(whiteDrone, (error, image) => {
            if (error)
                throw error;
            map.addImage(droneId, image);
            map.addLayer({
                'id': droneId,
                'source': droneId,
                'type': 'symbol',
                'layout': {
                    'icon-image': droneId,
                    'icon-size': 0.5,
                }
            });
        });

        const animateMarker = (timestamp) => {
            map.getSource(droneId)?.setData(pointAroundAstana(timestamp / 20000));

            requestAnimationFrame(animateMarker);
        }

        animateMarker(0);

        const randomTimeout = Math.random() * (40000 - 40000) + 3000;
        setTimeout(() => {
            const endDate = new Date();

            dispatch(dronesHistoryActions.removeWhiteDrones(droneId));
            dispatch(dronesHistoryActions.setPastDrones({
                droneId,
                startPosition: [astanaLongitude, astanaLatitude],
                placementTime, // Використовувати той же час розміщення
            }));

            map.removeLayer(droneId);
            map.removeSource(droneId);

            addDroneToMap(radius);
        }, randomTimeout);
    };

    map.on('style.load', () => {
        setInterval(() => {
            addDroneToMap(0.01);
            // addDroneToMap(Math.random() * (0.2 - 0.09) + 0.09);
        }, Math.random() * (20000 - 5000) + 5000);
    });
};
