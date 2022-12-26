import Vector2 from '@/Vector2';
import Color from '@/Color';

export namespace Canvaze {

	interface GraphicOption {
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

	interface IRenderer {
		render: (context: CanvasRenderingContext2D) => void;
	}

	export abstract class Entity implements IRenderer {
		protected readonly _id: symbol;
		private _position: Vector2;
		protected graphic: GraphicOption;

		/**
		 * Position of an entitys.
		 * @type {Vector2}
		 */
		get position(): Vector2 {
			return this._position;
		}
		/**
		 * Position of an entity on a canvas.
		 * @type {Vector2}
		 */
		set position(value: Vector2) {
			this._position = value;
		}
		/**
		 * ID entity.
		 * @type {symbol}
		 */
		get id(): symbol {
			return this._id;
		}

		/**
		 * @param {Object}      obj             Main object.
		 * @param {<Vector2>}   obj.position    - Position of an entity on a canvas.
		 * @param {GraphicOption} obj.graphic
		 */
		protected constructor({position, graphic}: {position: Vector2, graphic: GraphicOption}) {
			this._position = position;
			this.graphic = graphic;
			this._id = Symbol("id");
		}

		abstract render(context: CanvasRenderingContext2D): void;
	}

	export class Circle extends Entity {

		private _radius: number;

		constructor({position, radius = 10, graphic}: {position: Vector2, radius: number, graphic: GraphicOption}) {
			super({position, graphic});

			this._radius = radius;
		}

		render(context: CanvasRenderingContext2D): void {
			context.beginPath();
			context.arc(this.position.x, this.position.y, this._radius,0,2 * Math.PI);

			if (this.graphic.fillColor) {
				context.fillStyle = this.graphic.fillColor.getHash();
				context.fill();
			}

			if(this.graphic.borderColor && this.graphic.borderWidth && this.graphic.borderWidth !== 0) {
				context.lineWidth = this.graphic.borderWidth;
				context.strokeStyle = this.graphic.borderColor.getHash();
				context.stroke();
			}
			context.closePath();
		}

	}

	export class Scene {
		private readonly _context: CanvasRenderingContext2D;
		private readonly _width: number;
		private readonly _height: number;
		private _entities: Array<Entity>;

		constructor(context: CanvasRenderingContext2D, width: number, height: number) {
			this._context = context;
			this._width = width;
			this._height = height;
			this._entities = new Array<Entity>();
		}

		public AddEntity(entity: Entity) {
			this._entities.forEach((value, index) => {
				if (value.id == entity.id) return;
			});
			this._entities.push(entity);
		}

		public render() {
			this.clear();
			this._entities.forEach((entity) => {
				entity.render(this._context);
			})
		}

		public clear() {
			this._context.clearRect(0,0,this._width,this._height);
		}

		public ff() {
			return this._entities;
		}

	}
}

export default Canvaze;