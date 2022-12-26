
class Color {
    private _hexColor: number;

    /**
     * Colour hex.
     * @param value {number} hex color. E.g.: 0xFFFFFF
     */
    constructor(value: number) {
        console.log(this._hexParse(value));
        this._hexParse(value);
        this._hexColor = value;
    }

    private _hexParse(num: number) {
        let hex = num.toString(16);
        if (hex.length > 6) throw new Error('The hex colour code is too long!');
        if (hex.length < 6) {
            let temp: string = '';
            for (let i = 0; i < 6 - hex.length; i++) temp += '0';
            hex = temp + hex;
        }
        return hex;
    }

    private _getHex(num: number): string {
        return num.toString(16);
    }
    public getHex(): string {
        let hex = this._hexColor.toString(16);
        if (hex.length < 6) {
            let temp: string = '';
            for (let i = 0; i < 6 - hex.length; i++) temp += '0';
            hex = temp + hex;
        }
        return hex;
    }
    public getHash(): string {
        let hex = this._hexColor.toString(16);
        if (hex.length < 6) {
            let temp: string = '';
            for (let i = 0; i < 6 - hex.length; i++) temp += '0';
            hex = temp + hex;
        }
        return '#' + hex;
    }
}

export default Color