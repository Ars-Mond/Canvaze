import Entity from "@g/lib/Entity";

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

export default Scene;