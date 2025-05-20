export function getAlphabetByUnicodeRange(startCode, endCode) {
    const alphabet = [];
    for (let codePoint = startCode; codePoint <= endCode; codePoint++) {
        const character = String.fromCharCode(codePoint);
        alphabet.push(character);
    }
    return alphabet;
}
