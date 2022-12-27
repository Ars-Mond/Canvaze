import Vector2 from "@/Vector2";
import Entity from "@g/lib/Entity";
import {RectangleOption} from "@g/lib/OptionsTypes";

export class Rectangle extends Entity<RectangleOption> {

	constructor(option: RectangleOption) {
		super(option);
	}

	render(context: CanvasRenderingContext2D): void {
		context.beginPath();
		let div: Vector2 = Vector2.Div(this.option.size, 2);
		let pos1: Vector2 = Vector2.Sub(this.option.position, div);
		let pos2: Vector2 = Vector2.Add(this.option.position, div);

		if (this.option.fillColor) {
			context.fillStyle = this.option.fillColor.value;
			context.fillRect(pos1.x, pos1.y, pos2.x, pos2.y);
		}

		if (this.option.borderColor && this.option.borderWidth && this.option.borderWidth !== 0) {
			context.lineWidth = this.option.borderWidth;
			context.strokeRect(pos1.x, pos1.y, pos2.x, pos2.y);
		}

		//context.closePath();
	}
}

export default Rectangle;