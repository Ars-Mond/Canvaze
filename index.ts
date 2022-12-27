import Vector2 from '@/Vector2';
import Color from '@/Color';
import Quaternion from "@/Quaternion";

export namespace Canvaze {

	interface GraphicOption {
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

	interface IRenderer {
		render: (context: CanvasRenderingContext2D) => void;
	}

	abstract class Entity <TOption extends GraphicOption> implements IRenderer {
		protected readonly _id: symbol;
		private _option: TOption;

		get option(): TOption {
			return this._option;
		}

		set option(value: TOption) {
			this._option = value;
		}

		/**
		 * ID entity.
		 * @type {symbol}
		 */
		get id(): symbol {
			return this._id;
		}

		/**
		 * @param {GraphicOption} option	Main object.
		 */
		protected constructor(option: TOption) {
			this._id = Symbol("id");
			this._option = option;
		}

		/**
		 * Method render entity
		 * @param context
		 */
		abstract render(context: CanvasRenderingContext2D): void;
	}

	export class Line extends Entity<GraphicOption> {
		constructor(option: GraphicOption) {
			super(option);
		}

		render(context: CanvasRenderingContext2D) {

		}
	}

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

	export class Scene {
		private readonly _context: CanvasRenderingContext2D;
		private readonly _width: number;
		private readonly _height: number;
		private _entities: Array<Entity<any>>;

		get entities() {
			return this._entities;
		}

		constructor(context: CanvasRenderingContext2D, width: number, height: number) {
			this._context = context;
			this._width = width;
			this._height = height;
			this._entities = new Array<Entity<any>>();
		}

		public AddEntity(entity: Entity<any>): void {
			this._entities.forEach((value, index) => {
				if (value.id == entity.id) return;
			});
			this._entities.push(entity);
		}

		public RemoveEntity(entity: Entity<any>) {
			let index = this._entities.indexOf(entity);
			if (index >= 0)
				this._entities.splice(index, 1);
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

	}
}

export {default as Quaternion} from '@/Quaternion';
export {default as Vector2} from '@/Vector2';
export {default as Color} from '@/Color';