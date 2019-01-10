import {
	Component,
	OnInit,
	ElementRef,
	ViewChild,
	ChangeDetectionStrategy
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
// RXJS
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge, forkJoin } from 'rxjs';
// Models
import { QueryParamsModel } from '../../../../../../core/models/query-params.model';
import { DataTableItemModel } from '../../../../../../core/models/datatable-item.model';
import { DataTableDataSource } from './data-table.data-source';
// Services
import { DataTableService } from '../../../../../../core/services/datatable.service';

@Component({
	selector: 'm-data-table',
	templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit {
	dataSource: DataTableDataSource;
	displayedColumns = ['id', 'cManufacture',
		'cModel', 'cModelYear', 'cMileage', 'cColor', 'cPrice', 'cCondition', 'cStatus', 'actions'];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	selection = new SelectionModel<DataTableItemModel>(true, []);

	constructor(private dataTableService: DataTableService) {}

	ngOnInit() {
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => {
					this.loadItems();
				})
			)
			.subscribe();

		// Init DataSource
		this.dataSource = new DataTableDataSource(this.dataTableService);
		// First load
		this.loadItems(true);
  }

  loadItems(firstLoad: boolean = false) {
		const queryParams = new QueryParamsModel(
			{},
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			firstLoad ? 6 : this.paginator.pageSize
		);
		this.dataSource.loadItems(queryParams);
		this.selection.clear();
  }



  /* UI */
	getItemStatusString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Selling';
			case 1:
				return 'Sold';
		}
		return '';
	}

	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'success';
			case 1:
				return 'metal';
		}
		return '';
	}

	getItemConditionString(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'New';
			case 1:
				return 'Used';
		}
		return '';
	}

	getItemCssClassByCondition(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'primary';
			case 1:
				return 'accent';
		}
		return '';
	}
}
