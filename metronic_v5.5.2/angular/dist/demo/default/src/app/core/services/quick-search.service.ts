import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuickSearchService {
	API_URL: any = 'api';
	API_ENDPOINT: any = '/quick_search';

	constructor(private http: HttpClient) {}

	search(): Observable<any> {
		return this.http.get(this.API_URL + this.API_ENDPOINT);
	}
}
