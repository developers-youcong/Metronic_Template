import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, filter, delay, tap } from 'rxjs/operators';
import { HttpUtilsService } from '../utils/http-utils.service';
import { SpecificationsService } from './specification.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { SpecificationModel } from '../models/specification.model';
import { ProductSpecificationModel } from '../models/product-specification.model';

const API_PRODUCTSPECS_URL = 'api/productSpecs';

@Injectable()
export class ProductSpecificationsService {
	httpOptions = this.httpUtils.getHTTPHeader();

	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService,
		private specificationsService: SpecificationsService) { }

	// CREATE =>  POST: add a new product specification to the server
	createSpec(spec): Observable<ProductSpecificationModel> {
		console.log('run c', spec);
		return this.http.post<ProductSpecificationModel>(API_PRODUCTSPECS_URL, spec, this.httpUtils.getHTTPHeader());
	}

	// READ
	getAllSpecsByProductId(productId: number): Observable<ProductSpecificationModel[]> {
		const specs = this.specificationsService.getSpecs();
		const prodSpecs = this.http.get<ProductSpecificationModel[]>(API_PRODUCTSPECS_URL)
		.pipe(
			map(productSpecifications => productSpecifications.filter(ps => ps.carId === productId))
		);

		return forkJoin(specs, prodSpecs).pipe(
			map(res => {
				const _specs = res[0];
				const _prodSpecs = res[1];
				// tslint:disable-next-line:prefer-const
				let result: ProductSpecificationModel[] = [];
				_prodSpecs.forEach(item => {
					const _item = Object.assign({}, item);
					const sp = _specs.find(s => s.id.toString() === item.specId.toString());
					if (sp) {
						_item._specificationName = sp.name;
					}
					result.push(_item);
				});
				return result;
			})
		);
	}

	getSpecById(specId: number): Observable<ProductSpecificationModel> {
		return this.http.get<ProductSpecificationModel>(API_PRODUCTSPECS_URL + `/${specId}`);
	}

	findSpecs(queryParams: QueryParamsModel, productId: number): Observable<ProductSpecificationModel[]> {
		const params = this.httpUtils.getFindHTTPParams(queryParams);

		// comment this, when you work with real server
		// start
		return this.getAllSpecsByProductId(productId);
		// end

		// uncomment this, when you work with real server
		// start
		//  const url = this.API_PRODUCTSPECS_URL + '/find';
		//  return this.http.get<ProductSpecificationModel[]>(url, params);
		// Note: Add headers if needed
		// end
	}

	// UPDATE => PUT: update the product specification on the server
	updateSpec(spec: ProductSpecificationModel): Observable<any> {
		console.log('run u', spec);
		return this.http.put(API_PRODUCTSPECS_URL, spec, this.httpUtils.getHTTPHeader());
	}

	// DELETE => delete the product specification from the server
	deleteSpec(spec: ProductSpecificationModel): Observable<ProductSpecificationModel> {
		console.log('run d', spec);
		const url = `${API_PRODUCTSPECS_URL}/${spec.id}`;
		return this.http.delete<ProductSpecificationModel>(url);
	}
}

