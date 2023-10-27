export const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1; // Рандомна година у 12-годинному форматі (1-12)
    const minutes = Math.floor(Math.random() * 60); // Рандомні хвилини (0-59)
    const amPm = Math.random() < 0.5 ? 'AM' : 'PM'; // Випадково AM або PM

    // Функція padStart додасть 0 до початку числа, якщо воно одноцифрове
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
}