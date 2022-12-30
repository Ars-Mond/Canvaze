import Entity from "@g/lib/Entity";
import {LineOption} from "@g/lib/OptionsTypes";
import {Vector2} from "@/Vector2";

export class Line extends Entity<LineOption> {
	constructor(option: LineOption) {
		super(option);
	}

	public addPoints(points: Array<Vector2>) {
		this.option.points.push(...points);
	}

	render(context: CanvasRenderingContext2D) {
		context.beginPath();
		context.moveTo(this.option.points[0].x, this.option.points[0].y);
		for (let point of this.option.points) {
			context.lineTo(point.x, point.y);
		}

		if (this.option.fillColor) {
			context.fillStyle = this.option.fillColor.value;
			context.fill();
		}

		if (this.option.borderColor && this.option.borderWidth && this.option.borderWidth !== 0) {
			context.lineWidth = this.option.borderWidth;
			context.strokeStyle = this.option.borderColor.value;
			context.stroke();
		}
	}
}

export default Line;