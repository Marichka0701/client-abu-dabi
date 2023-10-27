let dronesCoordinates = [];

for (let i = 0; i < 5; i++) {
    const radius = Math.random() * 0.3 + 0.09;
    dronesCoordinates.push(radius);
}

export {
    dronesCoordinates,
};