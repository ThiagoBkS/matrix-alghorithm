public enum UnicodeAlphabet {
    LATIN(0x0000, 0x007F),
    LATIN_NUM(0x0030, 0x0039),
    GREEK(0x0370, 0x03FF),
    CYRILLIC(0x0400, 0x04FF),
    ARABIC(0x0600, 0x06FF),
    DEVANAGARI(0x0900, 0x097F),
    HANGUL_JAMO(0x1100, 0x11FF),
    GEORGIAN(0x10A0, 0x10FF);

    private final int startUnicodeHex;
    private final int endUnicodeHex;
    private char[] alphabet;

    UnicodeAlphabet(int startUnicodeHex, int endUnicodeHex) {
        this.startUnicodeHex = startUnicodeHex;
        this.endUnicodeHex = endUnicodeHex;
        this.alphabet = getAlphabetByUnicodeRange();
    }

    public char[] getAlphabet() {
        return alphabet;
    }

    public char getRandomChar() {
        return alphabet[(int) (Math.random() * alphabet.length)];
    }

    private char[] getAlphabetByUnicodeRange() {
        char[] characters = new char[endUnicodeHex - startUnicodeHex + 1];

        for (int unicode = startUnicodeHex; unicode <= endUnicodeHex; unicode++)
            characters[unicode - startUnicodeHex] = (char) unicode;

        return characters;
    }
}
