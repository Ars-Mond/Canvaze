import {XMath} from "@/XMath";

export class Color {
	private _r: number = 0;
	private _g: number = 0;
	private _b: number = 0;
	private _a: number = 0xFF;

	get value(): string {
		if (this._a < 0xFF) {
			let a = XMath.Map(this._a, 0x00, 0xFF, 0, 1);
			return `rgba(${this._r}, ${this._g}, ${this._b}, ${a}`;
		} else {
			return `rgb(${this._r}, ${this._g}, ${this._b}`;
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
		s = s % 100;
		v = v % 100;
		let f = (n: number, k = (n + h / 60) % 6) => {
			return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
		};
		this._r = (255 * f(5)) & 0xFF;
		this._g = (255 * f(3)) & 0xFF;
		this._b = (255 * f(1)) & 0xFF;
		this._a = 0xFF;
	}

	/*public getHSV() {
		let r = XMath.Map(this._r, 0, 255, 0, 1);
		console.log(r);
		let g = XMath.Map(this._g, 0, 255, 0, 1);
		console.log(g);
		let b = XMath.Map(this._b, 0, 255, 0, 1);
		console.log(b);
		let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
		let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
		return {H: 60 * (h < 0 ? h + 6 : h), S: v && c / v, V: v};
	}*/

	private _getHash(): string {
		return '#' + ((this._r << 8 * 2) + (this._g << 8 * 1) + (this._b << 8 * 0)).toString(16);
	}
}

export default Color;