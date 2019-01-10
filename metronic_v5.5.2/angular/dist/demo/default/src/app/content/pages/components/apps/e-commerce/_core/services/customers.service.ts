import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { CustomerModel } from '../models/customer.model';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';

const API_CUSTOMERS_URL = 'api/customers';

@Injectable()
export class CustomersService {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new customer to the server
	createCustomer(customer: CustomerModel): Observable<CustomerModel> {
		return this.http.post<CustomerModel>(API_CUSTOMERS_URL, customer, this.httpUtils.getHTTPHeader());
	}

	// READ
	getAllCustomers(): Observable<CustomerModel[]> {
		return this.http.get<CustomerModel[]>(API_CUSTOMERS_URL);
	}

	getCustomerById(customerId: number): Observable<CustomerModel> {
		return this.http.get<CustomerModel>(API_CUSTOMERS_URL + `/${customerId}`);
	}

	// Method from server should return QueryResultsModel(any[], totalsCount: number)
	findCustomers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		const params = this.httpUtils.getFindHTTPParams(queryParams);

		// Comment this when you start work with real server
		// This code imitates server calls
		// START
		const url = API_CUSTOMERS_URL;
		return this.http.get<CustomerModel[]>(API_CUSTOMERS_URL).pipe(
			mergeMap(res => of(new QueryResultsModel(res)))
		);
		// END

		// Uncomment this when you start work with real server
		// Note: Add headers if needed
		// START
		// const url = this.API_CUSTOMERS_URL + '/find';
		// return this.http.get<QueryResultsModel>(url, params);
		// END
	}

	// UPDATE => PUT: update the customer on the server
	updateCustomer(customer: CustomerModel): Observable<any> {
		return this.http.put(API_CUSTOMERS_URL, customer, this.httpUtils.getHTTPHeader());
	}

	// UPDATE Status
	// Comment this when you start work with real server
	// This code imitates server calls
	updateStatusForCustomer(customers: CustomerModel[], status: number): Observable<any> {
		const tasks$ = [];
		for (let i = 0; i < customers.length; i++) {
			const _customer = customers[i];
			_customer.status = status;
			tasks$.push(this.updateCustomer(_customer));
		}
		return forkJoin(tasks$);
	}

	// DELETE => delete the customer from the server
	deleteCustomer(customerId: number): Observable<CustomerModel> {
		const url = `${API_CUSTOMERS_URL}/${customerId}`;
		return this.http.delete<CustomerModel>(url);
	}

	// Method imitates server calls which deletes items from DB (should rewrite this to real server call)
	// START
	deleteCustomers(ids: number[] = []) {
		// Comment this when you start work with real server
		// This code imitates server calls
		// START
		const tasks$ = [];
		const length = ids.length;
		for (let i = 0; i < length; i++) {
			tasks$.push(this.deleteCustomer(ids[i]));
		}
		return forkJoin(tasks$);
		// END

		// Uncomment this when you start work with real server
		// Note: Add headers if needed
		// START
		// const url = this.API_CUSTOMERS_URL + '/delete';
		// return this.http.get<QueryResultsModel>(url, { params: ids });
		// END
	}
}


