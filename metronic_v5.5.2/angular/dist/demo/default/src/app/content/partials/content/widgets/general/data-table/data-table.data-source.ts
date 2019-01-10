import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, from, of} from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { QueryParamsModel } from '../../../../../../core/models/query-params.model';
import { QueryResultsModel } from '../../../../../../core/models/query-results.model';
import { DataTableService } from '../../../../../../core/services/datatable.service';
import { DataTableItemModel } from '../../../../../../core/models/datatable-item.model';

// Why not use MatTableDataSource?
/*  In this example, we will not be using the built-in MatTableDataSource because its designed for filtering,
	sorting and pagination of a client - side data array.
	Read the article: 'https://blog.angular-university.io/angular-material-data-table/'
**/
export class DataTableDataSource implements DataSource<DataTableItemModel> {
	entitySubject = new BehaviorSubject<any[]>([]);
	hasItems: boolean = false; // Need to show message: 'No records found

	// Loading | Progress bar
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$: Observable<boolean>;

	// Paginator | Paginators count
	paginatorTotalSubject = new BehaviorSubject<number>(0);
	paginatorTotal$: Observable<number>;

	constructor(private dataTableService: DataTableService) {
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

	baseFilter(_entities: any[], _queryParams: QueryParamsModel): QueryResultsModel {
		let entitiesResult = _entities;

		// Sorting
		// start
		if (_queryParams.sortField) {
			entitiesResult = this.sortArray(_entities, _queryParams.sortField, _queryParams.sortOrder);
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

    loadItems(queryParams: QueryParamsModel) {
		this.loadingSubject.next(true);
		this.dataTableService.getAllItems().pipe(
			tap(res => {
				const result = this.baseFilter(res, queryParams);
				this.entitySubject.next(result.items);
				this.paginatorTotalSubject.next(result.totalCount);

			}),
			catchError(err => of(new QueryResultsModel([], err))),
			finalize(() => this.loadingSubject.next(false))
		).subscribe();
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
}
