import Entity from "@g/lib/Entity";
import {CircleOption} from "@g/lib/OptionsTypes";


export class Circle extends Entity<CircleOption> {

	constructor(option: CircleOption) {
		super(option);
	}

	render(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.arc(this.option.position.x, this.option.position.y, this.option.radius,0,2 * Math.PI);

		if (this.option.fillColor) {
			context.fillStyle = this.option.fillColor.value;
			context.fill();
		}

		if(this.option.borderColor && this.option.borderWidth && this.option.borderWidth !== 0) {
			context.lineWidth = this.option.borderWidth;
			context.strokeStyle = this.option.borderColor.value;
			context.stroke();
		}
		context.closePath();
	}

}

export default Circle;
