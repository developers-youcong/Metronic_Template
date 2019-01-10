import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, filter, delay, tap } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';

const API_ORDERS_URL = 'api/orders';

@Injectable()
export class OrdersService {
	httpOptions = this.httpUtils.getHTTPHeader();

	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// CREATE
	// READ
	// UPDATE
	// DELETE
}


