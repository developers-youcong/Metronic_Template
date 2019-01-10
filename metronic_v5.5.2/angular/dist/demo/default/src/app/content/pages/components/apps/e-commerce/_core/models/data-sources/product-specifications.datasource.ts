import { Observable, from } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { ProductSpecificationsService } from '../../services/product-specifications.service';
import { QueryParamsModel } from '../query-models/query-params.model';
import { BaseDataSource } from './_base.datasource';
import { ProductSpecificationModel } from '../product-specification.model';
import { ListStateModel } from '../../utils/list-state.model';

export class ProductSpecificationsDataSource extends BaseDataSource {
	constructor(private productSpecificationService: ProductSpecificationsService) {
		super();
	}

	loadSpecs(queryParams: QueryParamsModel, lastState: ListStateModel) {
		this.loadingSubject.next(true);
		this.productSpecificationService.findSpecs(queryParams, lastState.entityId)
			.pipe(
				catchError(() => from([])),
				finalize(() => this.loadingSubject.next(false))
			).subscribe(specs => {
				// comment this, when you work with real server
				// start
				// Remove deletedItems
				// tslint:disable-next-line:prefer-const
				let filteredResult = [];
				if (lastState.deletedItems.length > 0) {
					specs.forEach(element => {
						const d_index = _.findIndex(lastState.deletedItems, function (o) { return o.id === element.id; });
						if (d_index === -1) {
							filteredResult.push(element);
						}
					});
				} else {
					filteredResult = specs;
				}

				// Update: Updated Items
				if (lastState.updatedItems.length > 0) {
					filteredResult.forEach(element => {
						const _rem = _.find(lastState.updatedItems, function (o) { return o.id === element.id; });
						if (_rem) {
							element._specificationName = _rem._specificationName;
							element.value = _rem.value;
							element.specId = _rem.specId;
						}
					});
				}

				// Add: New
				if (lastState.addedItems.length > 0) {
					lastState.addedItems.forEach(element => {
						filteredResult.push(element);
					});
				}

				const result = this.baseFilter(filteredResult, queryParams, []);
				this.entitySubject.next(result.items);
				this.paginatorTotalSubject.next(result.totalCount);
				// end

				// uncomment this, when you work with real server
				// start
				// this.entitySubject.next(specs);
				// end
			});
	}
}
