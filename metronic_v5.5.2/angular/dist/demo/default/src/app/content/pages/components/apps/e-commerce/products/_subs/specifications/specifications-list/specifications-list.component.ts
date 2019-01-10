import { Component, OnInit, ElementRef, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// RXJS
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge, BehaviorSubject } from 'rxjs';
// Services
import { LayoutUtilsService, MessageType } from '../../../../_core/utils/layout-utils.service';
import { ProductSpecificationsService } from '../../../../_core/services/product-specifications.service';
import { SpecificationsService } from '../../../../_core/services/specification.service';
// Models
import { ProductSpecificationModel } from '../../../../_core/models/product-specification.model';
import { ProductSpecificationsDataSource } from '../../../../_core/models/data-sources/product-specifications.datasource';
import { QueryParamsModel } from '../../../../_core/models/query-models/query-params.model';
import { ListStateModel, StateActions } from '../../../../_core/utils/list-state.model';
import { SpecificationModel } from '../../../../_core/models/specification.model';
// Components
import { SpecificationEditDialogComponent } from '../specification-edit/specification-edit-dialog.component';

// Table with EDIT item in new page
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	selector: 'm-specifications-list',
	templateUrl: './specifications-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecificationsListComponent implements OnInit {
	// Incoming data
	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	@Input() specsListState: ListStateModel;
	// Table fields
	dataSource: ProductSpecificationsDataSource;
	displayedColumns = ['select', '_specificationName', 'value', 'actions'];
	specificationsTypes: SpecificationModel[] = [];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	// Selection
	selection = new SelectionModel<ProductSpecificationModel>(true, []);
	productSpecificationsResult: ProductSpecificationModel[] = [];


	constructor(private productSpecificationsService: ProductSpecificationsService,
		public dialog: MatDialog,
		private layoutUtilsService: LayoutUtilsService,
		private specificationsService: SpecificationsService) { }

	/** LOAD DATA */
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
					this.loadSpecsList();
				})
			)
			.subscribe();

		// Filtration, bind to searchInput
		fromEvent(this.searchInput.nativeElement, 'keyup')
			.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
					this.paginator.pageIndex = 0;
					this.loadSpecsList();
				})
			)
			.subscribe();

		// Init DataSource
		this.dataSource = new ProductSpecificationsDataSource(this.productSpecificationsService);
		// this loading binded to parent component loading
		this.dataSource.loading$.subscribe(res => {
			this.loadingSubject.next(res);
		});
		this.loadSpecsList(true);
		this.dataSource.entitySubject.subscribe(res => this.productSpecificationsResult = res);
		this.specificationsService.getSpecs().subscribe(res => {
			this.specificationsTypes = res;
		});
	}

	loadSpecsList(_isFirstLoading: boolean = false) {
		let queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		if (_isFirstLoading) {
			queryParams = new QueryParamsModel(this.filterConfiguration(), 'asc', '_specificationName', 0, 10);
		}
		this.dataSource.loadSpecs(queryParams, this.specsListState);
	}

	/** FILTRATION */
	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		filter._specificationName = searchText;
		filter.value = searchText;
		return filter;
	}

	/** SELECTION */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.productSpecificationsResult.length;
		return numSelected === numRows;
	}

	 /** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.productSpecificationsResult.forEach(row => this.selection.select(row));
		}
	}

	/** ACTIONS */
	/** Delete */
	deleteSpec(_item: ProductSpecificationModel) {
		const _title: string = 'Specification Delete';
		const _description: string = 'Are you sure to permanently delete this specification?';
		const _waitDesciption: string = 'Specification is deleting...';
		const _deleteMessage = `Specification has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			_item._isDeleted = true;
			this.specsListState.setItem(_item, StateActions.DELETE);
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.loadSpecsList();
		});
	}

	/* Delete */
	deleteSpecs() {
		const _title: string = 'Specifications Delete';
		const _description: string = 'Are you sure to permanently delete selected specifications?';
		const _waitDesciption: string = 'Specifications are deleting...';
		const _deleteMessage = 'Selected specifications have been deleted';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const length = this.selection.selected.length;
			for (let i = 0; i < length; i++) {
				this.selection.selected[i]._isDeleted = true;
				this.specsListState.setItem(this.selection.selected[i], StateActions.DELETE);
			}
			this.loadSpecsList();
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.selection.clear();
		});
	}


	/** Fetch */
	fetchSpecs() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem._specificationName}: ${elem.value}`, id: elem.id
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}


	addSpec() {
		// tslint:disable-next-line:prefer-const
		let newSpec = new ProductSpecificationModel();
		newSpec.clear(this.specsListState.entityId);
		const dialogRef = this.dialog.open(SpecificationEditDialogComponent, {
			data: {
				specId: '',
				_specificationName: newSpec._specificationName,
				value: newSpec.value,
				isNew: true,
				specificationsTypes: this.specificationsTypes
			},
			width: '450px'
		});
		dialogRef.afterClosed().subscribe(res => {
			if (res && res.isUpdated) {
				newSpec._specificationName = res._specificationName;
				newSpec.specId = res.specId;
				newSpec.value = res.value;
				this.specsListState.setItem(newSpec, StateActions.CREATE);
				this.loadSpecsList();
				const saveMessage = `Specification has been created`;
				this.layoutUtilsService.showActionNotification(saveMessage, MessageType.Create, 10000, true, false);
			}
		});
	}

	editSpec(_item: ProductSpecificationModel) {
		const dialogRef = this.dialog.open(SpecificationEditDialogComponent, {
			data: {
				_specificationName: _item._specificationName,
				specId: _item.specId,
				value: _item.value,
				isNew: false,
				specificationsTypes: this.specificationsTypes
			},
			width: '450px'
		});
		dialogRef.afterClosed().subscribe(res => {
			if (res && res.isUpdated) {
				_item._specificationName = res._specificationName;
				_item.specId = res.specId;
				_item.value = res.value;

				this.specsListState.setItem(_item, StateActions.UPDATE);
				this.loadSpecsList();
				const saveMessage = `Specification has been updated`;
				this.layoutUtilsService.showActionNotification(saveMessage, MessageType.Update, 10000, true, false);
			}
		});
	}
}
