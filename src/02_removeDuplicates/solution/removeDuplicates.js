export default function removeDuplicates(str) {
    const wordArray = str.split(' ');
    const wordSet = new Set(wordArray);

    return [...wordSet].join(' ');
}
