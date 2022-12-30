import Vector2 from "@/Vector2";
import Color from "@/Color";

export interface GraphicOption {
	/**
	 * Position of an entity on a canvas.
	 * @type {Vector2}
	 */
	position: Vector2;
	/**
	 * Colour hex.
	 * @type {Color}
	 */
	fillColor?: Color;
	/**
	 * Colour hex.
	 * @type {Color}
	 */
	borderColor?: Color;
	borderWidth?: number;
}

export interface CircleOption extends GraphicOption {
	radius: number;
}

export interface RectangleOption extends GraphicOption {
	size: Vector2;
}

export interface LineOption extends GraphicOption {
	points: Array<Vector2>;
}