import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { QueryParamsModel } from '../query-models/query-params.model';
import { QueryResultsModel } from '../query-models/query-results.model';
import { BaseModel } from '../_base.model';
import * as _ from 'lodash';

// Why not use MatTableDataSource?
/*  In this example, we will not be using the built-in MatTableDataSource because its designed for filtering,
	sorting and pagination of a client - side data array.
	Read the article: 'https://blog.angular-university.io/angular-material-data-table/'
**/
export class BaseDataSource implements DataSource<BaseModel> {
	entitySubject = new BehaviorSubject<any[]>([]);
	hasItems: boolean = false; // Need to show message: 'No records found

	// Loading | Progress bar
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$: Observable<boolean>;

	// Paginator | Paginators count
	paginatorTotalSubject = new BehaviorSubject<number>(0);
	paginatorTotal$: Observable<number>;

	constructor() {
		this.loading$ = this.loadingSubject.asObservable();
		this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
		this.paginatorTotal$.subscribe(res => this.hasItems = res > 0);
	}

	connect(collectionViewer: CollectionViewer): Observable<any[]> {
		// Connecting data source
        return this.entitySubject.asObservable();
    }

	disconnect(collectionViewer: CollectionViewer): void {
		// Disonnecting data source
        this.entitySubject.complete();
		this.loadingSubject.complete();
		this.paginatorTotalSubject.complete();
	}

	baseFilter(_entities: any[], _queryParams: QueryParamsModel, _filtrationFields: string[] = []): QueryResultsModel {
		// Filtration
		let entitiesResult = this.searchInArray(_entities, _queryParams.filter, _filtrationFields);

		// Sorting
		// start
		if (_queryParams.sortField) {
			entitiesResult = this.sortArray(entitiesResult, _queryParams.sortField, _queryParams.sortOrder);
		}
		// end

		// Paginator
		// start
		const totalCount = entitiesResult.length;
		const initialPos = _queryParams.pageNumber * _queryParams.pageSize;
		entitiesResult = entitiesResult.slice(initialPos, initialPos + _queryParams.pageSize);
		// end

		const queryResults = new QueryResultsModel();
		queryResults.items = entitiesResult;
		queryResults.totalCount = totalCount;
		return queryResults;
	}

	sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
		if (!_sortField) {
			return _incomingArray;
		}

		let result: any[] = [];
		result = _incomingArray.sort((a, b) => {
			if (a[_sortField] < b[_sortField]) {
				return _sortOrder === 'asc' ? -1 : 1;
			}

			if (a[_sortField] > b[_sortField]) {
				return _sortOrder === 'asc' ? 1 : -1;
			}

			return 0;
		});
		return result;
	}

	searchInArray(_incomingArray: any[], _queryObj: any, _filtrationFields: string[] = []): any[] {
		const result: any[] = [];
		let resultBuffer: any[] = [];
		const indexes: number[] = [];
		let firstIndexes: number[] = [];
		let doSearch: boolean = false;

		_filtrationFields.forEach(item => {
			if (item in _queryObj) {
				_incomingArray.forEach((element, index) => {
					if (element[item] === _queryObj[item]) {
						firstIndexes.push(index);
					}
				});
				firstIndexes.forEach(element => {
					resultBuffer.push(_incomingArray[element]);
				});
				_incomingArray = resultBuffer.slice(0);
				resultBuffer = [].slice(0);
				firstIndexes = [].slice(0);
			}
		});

		Object.keys(_queryObj).forEach(key => {
			const searchText = _queryObj[key].toString().trim().toLowerCase();
			if (key && !_.includes(_filtrationFields, key) && searchText) {
				doSearch = true;
				try {
					_incomingArray.forEach((element, index) => {
						const _val = element[key].toString().trim().toLowerCase();
						if (_val.indexOf(searchText) > -1 && indexes.indexOf(index) === -1) {
							indexes.push(index);
						}
					});
				} catch (ex) {
					console.log(ex, key, searchText);
				}
			}
		});

		if (!doSearch) {
			return _incomingArray;
		}

		indexes.forEach(re => {
			result.push(_incomingArray[re]);
		});

		return result;
	}
}
