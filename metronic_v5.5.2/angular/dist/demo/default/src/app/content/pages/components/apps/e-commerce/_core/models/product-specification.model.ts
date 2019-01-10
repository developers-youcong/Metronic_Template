import { BaseModel } from './_base.model';

export class ProductSpecificationModel  extends BaseModel {
	id: number;
	carId: number;
	specId: number;
	value: string;

	// Refs
	_carName: string;
	_specificationName: string;

	clear(carId: number) {
		this.id = undefined;
		this.carId = carId;
		this._specificationName = '';
		this.value = '';
		this.specId = undefined;
	}
}
