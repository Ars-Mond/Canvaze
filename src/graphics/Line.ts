import Entity from "@g/lib/Entity";
import {GraphicOption} from "@g/lib/OptionsTypes";

export class Line extends Entity<GraphicOption> {
	constructor(option: GraphicOption) {
		super(option);
	}

	render(context: CanvasRenderingContext2D) {

	}
}

export default Line;