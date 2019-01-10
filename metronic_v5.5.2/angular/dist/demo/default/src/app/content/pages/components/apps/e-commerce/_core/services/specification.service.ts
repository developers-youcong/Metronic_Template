import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, filter, delay, tap } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { SpecificationModel } from '../models/specification.model';

const API_SPECS_URL = 'api/specs';

@Injectable()
export class SpecificationsService {
	httpOptions = this.httpUtils.getHTTPHeader();

	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	// CREATE
	// READ
	getSpecs(): Observable<SpecificationModel[]> {
		return this.http.get<SpecificationModel[]>(API_SPECS_URL).pipe(
			map(ar => ar.sort((a, b) => {
				if (a.sort < b.sort) {
					return 1;
				}

				return 0;
			})
			)
		);
	}
	// UPDATE
	// DELETE
}


