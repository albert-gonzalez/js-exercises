const MAX_RETRIES = 5;

export default function* lotteryGenerator(maxNumber = 100, quantity = 6) {
    const numbers = [];
    let retries = 0;

    while (numbers.length < quantity) {
        if (retries >= MAX_RETRIES) {
            throw new Error('Error generating numbers');
        }

        const num = Math.ceil(Math.random() * maxNumber);

        if (numbers.includes(num)) {
            retries++;

            continue;
        }

        numbers.push(num);

        retries = 0;

        yield num;
    }
}
