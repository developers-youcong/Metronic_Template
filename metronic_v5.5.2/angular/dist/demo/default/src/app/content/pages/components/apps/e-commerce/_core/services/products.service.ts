import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { ProductModel } from '../models/product.model';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';

const API_PRODUCTS_URL = 'api/products';

@Injectable()
export class ProductsService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));

	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product to the server
	createProduct(product): Observable<ProductModel> {
		return this.http.post<ProductModel>(API_PRODUCTS_URL, product, this.httpUtils.getHTTPHeader());
	}

	// READ
	getAllProducts(): Observable<ProductModel[]> {
		return this.http.get<ProductModel[]>(API_PRODUCTS_URL);
	}

	getProductById(productId: number): Observable<ProductModel> {
		return this.http.get<ProductModel>(API_PRODUCTS_URL + `/${productId}`);
	}

	findProducts(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		const params = this.httpUtils.getFindHTTPParams(queryParams);

		// Comment this when you start work with real server
		// This code imitates server calls
		// START
		return this.getAllProducts().pipe(
			mergeMap(res => of(new QueryResultsModel(res)))
		);
		// END

		// Uncomment this when you start work with real server
		// Note: Add headers if needed
		// START
		// const url = this.API_PRODUCTS_URL + '/find';
		// return this.http.get<QueryResultsModel>(url, params);
		// END
	}

	// UPDATE => PUT: update the product on the server
	updateProduct(product: ProductModel): Observable<any> {
		return this.http.put(API_PRODUCTS_URL, product, this.httpUtils.getHTTPHeader());
	}

	// UPDATE Status
	// Comment this when you start work with real server
	// This code imitates server calls
	updateStatusForProduct(products: ProductModel[], status: number): Observable<any> {
		const tasks$ = [];
		for (let i = 0; i < products.length; i++) {
			const _product = products[i];
			_product.status = status;
			tasks$.push(this.updateProduct(_product));
		}
		return forkJoin(tasks$);
	}

	// DELETE => delete the product from the server
	deleteProduct(productId: number): Observable<ProductModel> {
		const url = `${API_PRODUCTS_URL}/${productId}`;
		return this.http.delete<ProductModel>(url);
	}

	// Method imitates server calls which deletes items from DB (should rewrite this to real server call)
	// START
	deleteProducts(ids: number[] = []) {
		// Comment this when you start work with real server
		// This code imitates server calls
		// START
		const tasks$ = [];
		const length = ids.length;
		for (let i = 0; i < length; i++) {
			tasks$.push(this.deleteProduct(ids[i]));
		}
		return forkJoin(tasks$);
		// END

		// Uncomment this when you start work with real server
		// Note: Add headers if needed
		// START
		// const url = this.API_PRODUCTS_URL + '/delete';
		// return this.http.get<QueryResultsModel>(url, { params: ids });
		// END
	}
}
