import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { ProductRemarkModel } from '../models/product-remark.model';

const API_PRODUCTREMARKS_URL = 'api/productRemarks';

@Injectable()
export class ProductRemarksService {
	httpOptions = this.httpUtils.getHTTPHeader();

	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product remark to the server
	createRemark(remark): Observable<ProductRemarkModel> {
		return this.http.post<ProductRemarkModel>(API_PRODUCTREMARKS_URL, remark, this.httpUtils.getHTTPHeader());
	}

	// READ
	getAllRemarksByProductId(productId: number): Observable<ProductRemarkModel[]> {
		return this.http.get<ProductRemarkModel[]>(API_PRODUCTREMARKS_URL)
			.pipe(
				map(remarks => remarks.filter(rem => rem.carId === productId))
			);
	}

	getRemarkById(remarkId: number): Observable<ProductRemarkModel> {
		return this.http.get<ProductRemarkModel>(API_PRODUCTREMARKS_URL + `/${remarkId}`);
	}

	findRemarks(queryParams: QueryParamsModel, productId: number): Observable<ProductRemarkModel[]> {
		const params = this.httpUtils.getFindHTTPParams(queryParams);

		// comment this, when you work with real server
		// start
		return this.getAllRemarksByProductId(productId);
		// end

		// uncomment this, when you work with real server
		// start
		//  const url = this.API_PRODUCTREMARKS_URL + '/find';
		//  return this.http.get<ProductRemarkModel[]>(url, params);
		// Note: Add headers if needed
		// end
	}

	// UPDATE => PUT: update the product remark on the server
	updateRemark(remark: ProductRemarkModel): Observable<any> {
		return this.http.put(API_PRODUCTREMARKS_URL, remark, this.httpUtils.getHTTPHeader());
	}

	// DELETE => delete the product remark from the server
	deleteRemark(remark: ProductRemarkModel): Observable<ProductRemarkModel> {
		const url = `${API_PRODUCTREMARKS_URL}/${remark.id}`;
		return this.http.delete<ProductRemarkModel>(url);
	}
}
