export default function promiseRace(promises) {
    const isMap = promises instanceof Map;

    let promisesArray = [...(promises || [])];

    return new Promise((resolve, reject) => {
        if (!promisesArray.length) {
            return;
        }

        promisesArray.forEach(async promiseOrValue => {
            if (isMap) {
                promiseOrValue = promiseOrValue[1];
            }

            if (promiseOrValue instanceof Promise === false) {
                Promise.resolve(promiseOrValue).then(resolve);

                return;
            }

            promiseOrValue.then(resolve).catch(reject);
        });
    });
}
