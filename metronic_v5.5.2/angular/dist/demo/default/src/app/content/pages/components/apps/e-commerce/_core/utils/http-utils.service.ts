import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HttpUtilsService {

	getFindHTTPParams(queryParams): HttpParams {
		const params = new HttpParams()
			.set('lastNamefilter', queryParams.filter)
			.set('sortOrder', queryParams.sortOrder)
			.set('sortField', queryParams.sortField)
			.set('pageNumber', queryParams.pageNumber.toString())
			.set('pageSize', queryParams.pageSize.toString());

		return params;
	}

	getHTTPHeader() {
		return {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
	}
}
