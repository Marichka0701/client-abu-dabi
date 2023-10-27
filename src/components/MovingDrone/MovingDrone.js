import React, { useEffect, useState } from 'react';

const MovingObject = ({ map, initialCoordinates }) => {
    const [coordinates, setCoordinates] = useState(initialCoordinates);

    useEffect(() => {
        // Початкове положення об'єкта
        setCoordinates(initialCoordinates);

        // Функція, яка оновлює положення об'єкта на карті
        const updateCoordinates = () => {
            // Оновлюємо положення об'єкта, наприклад, змінюючи координати
            const newCoordinates = [coordinates[0] + 1, coordinates[1] + 1];
            setCoordinates(newCoordinates);

            // Оновлюємо положення об'єкта на карті
            map.getSource('moving-object').setData({
                type: 'Point',
                coordinates: newCoordinates,
            });

            // Повторно викликаємо цю функцію через певний інтервал часу
            setTimeout(updateCoordinates, 1000); // Змініть інтервал, як вам потрібно
        };

        // Починаємо анімацію
        updateCoordinates();
    }, [map, coordinates, initialCoordinates]);

    return null;
};

export default MovingObject;
