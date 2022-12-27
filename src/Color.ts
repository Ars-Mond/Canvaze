class Color {
    private _hexColor: number;

    /**
     * Colour hex.
     * @param value {number} hex color. E.g.: 0xFFFFFF
     */
    constructor(value: number) {
        this._hexParse(value);
        this._hexColor = value;
    }

    get value(): string {
        return this.getHash();
    }

    private _hexParse(num: number) {
        if (num.toString(16).length > 6) throw new Error('The hex colour code is too long!');
    }

    private _getHex(num: number): string {
        return num.toString(16);
    }

    public getHash(): string {
        return '#' + Color.GetFullHash(this._hexColor);
    }

    public static GetFullHash(value: number): string {
        let hex = value.toString(16).slice(-6);
        hex = ('000000' + hex).slice(-6);
        return hex;
    }
}

export default Color