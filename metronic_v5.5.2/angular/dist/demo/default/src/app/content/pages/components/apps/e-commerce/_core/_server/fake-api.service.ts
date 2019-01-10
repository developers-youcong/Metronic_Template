import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ECommerceDataContext } from './fake-db/_e-commerce.data-context';

// Angular-In-Memory service |  Emulates CRUD operations over a RESTy API.
// See off.documentations: 'https://github.com/angular/in-memory-web-api'
@Injectable()
export class FakeApiService implements InMemoryDbService {
	constructor() {}

	createDb(): {} | Observable<{}> {
		return {
			// e-commerce
			// customers
			customers: ECommerceDataContext.customers,
			// products
			products: ECommerceDataContext.cars,
			specs: ECommerceDataContext.specs,
			productRemarks: ECommerceDataContext.remarks,
			productSpecs: ECommerceDataContext.carSpecs,

			// orders
			orders: ECommerceDataContext.orders
		};
	}
}
