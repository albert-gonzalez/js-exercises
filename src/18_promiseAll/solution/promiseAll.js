export default function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let values = [];
        const promisesArray = [...(promises || [])];
        const isMap = promises instanceof Map;

        if (!promisesArray.length) {
            return resolve();
        }

        const setValue = (value, index) => {
            count++;
            values[index] = value;

            if (count === promisesArray.length) {
                resolve(values);
            }
        };

        promisesArray.forEach((promiseOrValue, index) => {
            if (isMap) {
                promiseOrValue = promiseOrValue[1];
            }

            if (promiseOrValue instanceof Promise === false) {
                Promise.resolve(promises).then(() =>
                    setValue(promiseOrValue, index)
                );

                return;
            }

            promiseOrValue
                .then(value => {
                    setValue(value, index);
                })
                .catch(reject);
        });
    });
}
