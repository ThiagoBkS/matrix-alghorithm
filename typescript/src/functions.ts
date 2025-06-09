export const avaliableAlphabets = [
	{
		name: "Latin",
		startCode: 0x0000,
		endCode: 0x007f,
	},
	{
		name: "Latin Num.",
		startCode: 0x0030,
		endCode: 0x0039,
	},
	{
		name: "Greek",
		startCode: 0x0370,
		endCode: 0x03ff,
	},
	{
		name: "Cyrillic",
		startCode: 0x0400,
		endCode: 0x04ff,
	},
	{
		name: "Arabic",
		startCode: 0x600,
		endCode: 0x6ff,
	},
	{
		name: "Devanagari",
		startCode: 0x900,
		endCode: 0x97f,
	},
	{
		name: "Hangul Jamo",
		startCode: 0x1100,
		endCode: 0x11ff,
	},
	{
		name: "Georgian",
		startCode: 0x10a0,
		endCode: 0x10ff,
	},
];

export function getAlphabetByUnicodeRange(startCode: number, endCode: number): Array<string> {
	const alphabet = [];

	for (let codePoint = startCode; codePoint <= endCode; codePoint++) {
		const character = String.fromCharCode(codePoint);
		alphabet.push(character);
	}

	return alphabet;
}

export function getAlphabetByName(alphabetName: string) {
	const { startCode, endCode } = avaliableAlphabets.find(
		(alphabet) => alphabet.name === alphabetName
	) || {
		startCode: 0x0000,
		endCode: 0x007f,
	};

	return getAlphabetByUnicodeRange(startCode, endCode);
}
