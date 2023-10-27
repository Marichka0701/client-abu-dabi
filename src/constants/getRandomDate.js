export const getRandomDate = () => {
    const startDate = new Date('2021-01-01');
    const endDate = new Date('2023-12-31');

    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const randomDate = new Date(randomTime);

    const day = randomDate.getDate().toString().padStart(2, '0');
    const month = (randomDate.getMonth() + 1).toString().padStart(2, '0'); // Додаємо 1, оскільки місяці в JavaScript починаються з 0
    const year = randomDate.getFullYear();

    return `${day}.${month}.${year}`;
}