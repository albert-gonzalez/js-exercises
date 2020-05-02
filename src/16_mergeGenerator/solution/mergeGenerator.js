export default function* mergeGenerator(mergeFn, ...generators) {
    let currentYieldedObjects;

    while (true) {
        currentYieldedObjects = generators.map(generator => generator.next());

        if (currentYieldedObjects.find(object => object.done)) {
            return;
        }

        yield mergeFn(...currentYieldedObjects.map(object => object.value));
    }
}
