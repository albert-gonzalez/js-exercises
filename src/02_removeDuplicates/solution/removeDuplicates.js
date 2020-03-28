export default function removeDuplicates(str) {
    const wordArray = str.split(' ');
    const wordSet = new Set(wordArray);

    return [...wordSet].join(' ');
}

/* 

Solution with reducer
function removeDuplicatesReducer(str) {
    return str
        .split(' ')
        .reduce((acc, word) => {
            if (!acc.includes(word)) {
                return acc.concat(word);
            }

            return acc;
        }, [])
        .join(' ');
}
*/
