import * as _ from 'lodash';

export enum StateActions {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

export class ListStateModel {
	entityId: any;
	deletedItems: any[] = [];
	updatedItems: any[] = [];
	addedItems: any[] = [];

	constructor(_entityId) {
		this.entityId = _entityId;
	}

	setItem(_item: any, actionType: StateActions) {
		switch (actionType) {
			case StateActions.CREATE: this.createItem(_item); break;
			case StateActions.UPDATE: this.updateItem(_item); break;
			default: this.deleteItem(_item);
		}
	}

	private createItem(_item: any) {
		_item._prevState = _item;
		this.addedItems.push(_item);
	}

	private updateItem(_item: any) {
		if (!_item.id) {
			const c_index = _.findIndex(this.addedItems, function (o) { return o === _item._prevState; });
			if (c_index > -1) {
				this.addedItems[c_index] = _item;
				this.addedItems[c_index]._prevState = _item;
			}
		} else {
			const u_index = _.findIndex(this.updatedItems, function (o) { return o.id === _item.id; });
			if (u_index > -1) {
				this.updatedItems[u_index]._prevState = _item;
				this.updatedItems[u_index] = _item;
			} else {
				_item._prevState = _item;
				this.updatedItems.push(_item);
			}
		}
	}

	private deleteItem(_item: any) {
		if (_item.id) {
			const d_index = _.findIndex(this.deletedItems, function (o) { return o.id === _item.id; });
			const u_index = _.findIndex(this.updatedItems, function (o) { return o.id === _item.id; });
			if (d_index === -1) {
				this.deletedItems.push(_item);
			}
			if (u_index > -1) {
				_.pull(this.updatedItems, _item);
			}
			return;
		}

		if (!_item.id) {
			const c_index = _.findIndex(this.addedItems, function (o) { return o === _item; });
			if (c_index > -1) {
				_.pull(this.addedItems, _item);
			}
		}
	}

	prepareState() {
		this.addedItems.forEach(element => {
			element._prevState = null;
		});
		this.updatedItems.forEach(element => {
			element._prevState = null;
		});
		this.deletedItems.forEach(element => {
			element._prevState = null;
		});
	}
}
