export function getAlphabetByUnicodeRange(startCode: number, endCode: number): Array<string> {
	const alphabet: Array<string> = [];

	for (let codePoint = startCode; codePoint <= endCode; codePoint++) {
		const character = String.fromCharCode(codePoint);
		alphabet.push(character);
	}

	return alphabet;
}
