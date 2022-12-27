import {GraphicOption} from "@g/lib/OptionsTypes";

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

export default Entity;