import {XMath} from "@/XMath";

export class Color {
	private _r: number = 0;
	private _g: number = 0;
	private _b: number = 0;
	private _a: number = 0xFF;

	get value(): string {
		if (this._a < 0xFF) {
			let a = XMath.Map(this._a, 0x00, 0xFF, 0, 1);
			return `rgba(${this._r}, ${this._g}, ${this._b}, ${a})`;
		} else {
			return `rgb(${this._r}, ${this._g}, ${this._b})`;
			//return this.getHash();
		}
	}

	get R(): number {
		return this._r;
	}

	get G(): number {
		return this._g;
	}

	get B(): number {
		return this._b;
	}

	get A(): number {
		return this._a;
	}

	set R(r: number) {
		this._r = r & 0xFF;
	}

	set G(g: number) {
		this._g = g & 0xFF;
	}

	set B(b: number) {
		this._b = b & 0xFF;
	}

	set A(a: number) {
		this._a = a & 0xFF;
	}

	/**
	 * Colour hex.
	 * @param color {Color} Color class
	 */
	constructor(color: Color);
	/**
	 * Colour hex.
	 * @param color {string} hex color. E.g.: #FFFFFF or FFFFFF
	 */
	constructor(color: string);
	/**
	 * Colour hex.
	 * @param color {number} hex color. E.g.: 0xFFFFFF
	 */
	constructor(color: number);
	/**
	 * Colour hex.
	 * @param r
	 * @param g
	 * @param b
	 * @param a
	 */
	constructor(r: number, g: number, b: number, a: number);
	constructor(value: Color | number | string, value2?: number, value3?: number, value4?: number) {

		if (typeof value2 === 'undefined' || typeof value3 === 'undefined' || typeof value4 === 'undefined') {
			this._set(value);
		} else {
			this._r = typeof value === 'number' ? value : 0;
			this._g = value2;
			this._b = value3;
			this._a = value4;
		}
	}

	private _set(value: Color | number | string) {
		if (value instanceof Color) {
			this._copy(value);
		} else if (typeof value === 'number') {
			this._setHash(value);
		} else if (typeof value === 'string') {
			this._setStyle(value);
		} else {
			throw new SyntaxError('E');
		}
		//ToDo Add string color name;
	}

	private _copy(value: Color): void {
		this._r = value._r;
		this._g = value._g;
		this._b = value._b;
		this._a = value._a;
	}

	private _setHash(value: number): void {
		this._r = (value >> 8 * 2) & 0xFF;
		this._g = (value >> 8 * 1) & 0xFF;
		this._b = (value >> 8 * 0) & 0xFF;
		this._a = 0xFF;
	}

	private _setStyle(value: string): void {
		let r = /^#?[\dabcdef]{6,8}$/.exec(value);
		if (!r) throw new Error('Value is not valid');

		if (value.startsWith('#')) value = value.slice(1);

		if (value.length > 6) {
			value = ('00000000' + value).slice(-8);
			let data = parseInt(value);
			this._r = (data >> 8 * 3) & 0xFF;
			this._g = (data >> 8 * 2) & 0xFF;
			this._b = (data >> 8 * 1) & 0xFF;
			this._a = (data >> 8 * 0) & 0xFF;
		} else {
			value = ('000000' + value).slice(-6);
			let data = parseInt(value);
			this._r = (data >> 8 * 2) & 0xFF;
			this._g = (data >> 8 * 1) & 0xFF;
			this._b = (data >> 8 * 0) & 0xFF;
			this._a = 0xFF;
		}
	}

	private _getArray(full: boolean = false): Array<number> {
		return full ? [this._r, this._g, this._b, this._a] : [this._r, this._g, this._b];
	}

	public getRGB() {
		return {R: this._r, G: this._g, B: this._b};
	}

	public getRGBA() {
		return {R: this._r, G: this._g, B: this._b, A: this._a};
	}

	public setRGB(r: number, g: number, b: number) {
		this._r = r & 0xFF;
		this._g = g & 0xFF;
		this._b = b & 0xFF;
		this._a = 0xFF;
	}

	public setRGBA(r: number, g: number, b: number, a: number) {
		this._r = r & 0xFF;
		this._g = g & 0xFF;
		this._b = b & 0xFF;
		this._a = a & 0xFF;
	}

	public setHSV(h: number, s: number, v: number) {
		h = h % 360;
		s = s / 100;
		v = v / 100;
		let f = (n: number, k = (n + h / 60) % 6) => {
			return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
		};
		this._r = (255 * f(5)) & 0xFF;
		this._g = (255 * f(3)) & 0xFF;
		this._b = (255 * f(1)) & 0xFF;
		this._a = 0xFF;
	}

	/**
	 * The method of creating a hex color code.
	 * @return {{H: number, S: number, V: number}| object} Hex color code.
	 */
	public getHSV() {
		let r = this._r / 255;
		let g = this._g / 255;
		let b = this._b / 255;

		let max = Math.max(r, g, b), min = Math.min(r, g, b);
		let h: number = 0;
		let s: number = 0;
		let v: number = max;

		let d = max - min;
		s = max == 0 ? 0 : d / max;

		if (max == min) {
			h = 0;
		} else {
			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}

			h /= 6;
		}

		h = Math.round(360 * h);
		s = Math.round(100 * s);
		v = Math.round(100 * v);

		return { H: h, S: s, V: v };
	}

	/**
	 * The method of creating a hex color code.
	 * @return {string} Hex color code.
	 */
	public getHash(): string {
		let arr = this._getArray();
		let hex: string = '#';
		for (let ri of arr) {
			let str = (ri & 0xFF).toString(16);
			let temp = ['00', '0' + str, str];
			hex += temp[str.length];
		}
		return hex.toUpperCase();
	}

	/**
	 * The method of creating a hex color code with alpha.
	 * @return {string} Hex color code with alpha.
	 */
	public getAlphaHash(): string {
		let arr = this._getArray(true);
		let hex: string = '#';
		for (let ri of arr) {
			let str = (ri & 0xFF).toString(16);
			let temp = ['00', '0' + str, str];
			hex += temp[str.length];
		}
		return hex.toUpperCase();
	}
}

export default Color;