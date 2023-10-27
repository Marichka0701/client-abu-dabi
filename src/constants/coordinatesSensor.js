import {getRandomTime} from "./getRandomTime";
import {getRandomDate} from "./getRandomDate";

// abu dabi
const latitude = 24.400745;
const longitude = 54.382988;

// astana
// const latitude = 51.140528;
// const longitude = 71.413961;

// saudi
// const latitude = 24.556808;
// const longitude = 46.885250;



const numberOfPoints = 5;
const maxOffset = 10 / 111.32; // Переведення градусів в кілометри (приблизно)

export const randomCoordinatesSensors = Array.from({length: numberOfPoints}, () => ({
    latitude: latitude + (Math.random() * 2 - 1) * maxOffset,
    longitude: longitude + (Math.random() * 2 - 1) * maxOffset,
}));

let features = [];
for (const item of randomCoordinatesSensors) {
    const message = {
        coordinates: [item.longitude, item.latitude],
        height: Math.floor(Math.random() * (1001 - 300) + 300) + 'm',
        placementTime: getRandomTime(),
        placementDate: getRandomDate(),
    }

    const featureItem = {
        type: 'Feature',
        properties: {
            message,
            iconSize: [40, 40],
        },
        geometry: {
            type: 'Point',
            coordinates: [item.longitude, item.latitude],
        },
    }
    features.push(featureItem);
}

export const geoJson = {
    type: 'FeatureCollection',
    features,
}


