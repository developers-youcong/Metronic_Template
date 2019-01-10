import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Material
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// RXJS
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
// Services
import { ProductsService } from '../../_core/services/products.service';
import { LayoutUtilsService, MessageType } from '../../_core/utils/layout-utils.service';
import { SubheaderService } from '../../../../../../../core/services/layout/subheader.service';
// Models
import { ProductModel } from '../../_core/models/product.model';
import { ProductsDataSource } from '../../_core/models/data-sources/products.datasource';
import { QueryParamsModel } from '../../_core/models/query-models/query-params.model';

// Table with EDIT item in new page
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	selector: 'm-products-list',
	templateUrl: './products-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {
	// Table fields
	dataSource: ProductsDataSource;
	displayedColumns = ['select', 'VINCode', 'manufacture', 'model', 'modelYear', 'color', 'price', 'condition', 'status', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	filterStatus: string = '';
	filterCondition: string = '';
	// Selection
	selection = new SelectionModel<ProductModel>(true, []);
	productsResult: ProductModel[] = [];

	constructor(private productsService: ProductsService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService) { }

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
					this.loadProductsList();
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
					this.loadProductsList();
				})
			)
			.subscribe();

		// Set title to page breadCrumbs
		this.subheaderService.setTitle('Products');
		// Init DataSource
		this.dataSource = new ProductsDataSource(this.productsService);
		let queryParams = new QueryParamsModel({});
		// Read from URL itemId, for restore previous state
		this.route.queryParams.subscribe(params => {
			if (params.id) {
				queryParams = this.productsService.lastFilter$.getValue();
				this.restoreState(queryParams, +params.id);
			}
			// First load
			this.dataSource.loadProducts(queryParams);
		});
		this.dataSource.entitySubject.subscribe(res => this.productsResult = res);
	}

	loadProductsList() {
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.dataSource.loadProducts(queryParams);
	}

	/** FILTRATION */
	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterCondition && this.filterCondition.length > 0) {
			filter.condition = +this.filterCondition;
		}

		filter.model = searchText;

		filter.manufacture = searchText;
		filter.color = searchText;
		filter.VINCode = searchText;
		return filter;
	}

	restoreState(queryParams: QueryParamsModel, id: number) {
		console.log('restoreState', id);
		if (id > 0) {
			this.productsService.getProductById(id).subscribe((res: ProductModel) => {
				console.log('res', res);
				const message = res._createdDate === res._updatedDate ?
					`New product successfully has been added.` :
					`Product successfully has been saved.`;
				this.layoutUtilsService.showActionNotification(message, res._isNew ? MessageType.Create : MessageType.Update, 10000, true, false);
			});
		}

		if (!queryParams.filter) {
			return;
		}

		if ('condition' in queryParams.filter) {
			this.filterCondition = queryParams.filter.condition.toString();
		}

		if ('status' in queryParams.filter) {
			this.filterStatus = queryParams.filter.status.toString();
		}

		if (queryParams.filter.model) {
			this.searchInput.nativeElement.value = queryParams.filter.model;
		}
	}

	/** ACTIONS */
	/** Delete */
	deleteProduct(_item: ProductModel) {
		const _title: string = 'Product Delete';
		const _description: string = 'Are you sure to permanently delete this product?';
		const _waitDesciption: string = 'Product is deleting...';
		const _deleteMessage = `Product has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.productsService.deleteProduct(_item.id).subscribe(() => {
				this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
				this.loadProductsList();
			});
		});
	}

	deleteProducts() {
		const _title: string = 'Products Delete';
		const _description: string = 'Are you sure to permanently delete selected products?';
		const _waitDesciption: string = 'Products are deleting...';
		const _deleteMessage = 'Selected products have been deleted';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const idsForDeletion: number[] = [];
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}
			this.productsService.deleteProducts(idsForDeletion).subscribe(() => {
				this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
				this.loadProductsList();
				this.selection.clear();
			});
		});
	}

	/** Fetch */
	fetchProducts() {
		// tslint:disable-next-line:prefer-const
		let messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.manufacture} ${elem.model} ${elem.modelYear}`,
				id: elem.VINCode,
				status: elem.status
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	/** Update Product */
	updateStatusForProducts() {
		const _title = 'Update status for selected products';
		const _updateMessage = 'Status has been updated for selected products';
		const _statuses = [{ value: 0, text: 'Selling' }, { value: 1, text: 'Sold' }];
		const _messages = [];

		this.selection.selected.forEach(elem => {
			_messages.push({
				text: `${elem.manufacture} ${elem.model} ${elem.modelYear}`,
				id: elem.VINCode,
				status: elem.status,
				statusTitle: this.getItemStatusString(elem.status),
				statusCssClass: this.getItemCssClassByStatus(elem.status)
			});
		});

		const dialogRef = this.layoutUtilsService.updateStatusForCustomers(_title, _statuses, _messages);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				this.selection.clear();
				return;
			}

			this.productsService.updateStatusForProduct(this.selection.selected, +res).subscribe(() => {
				this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update);
				this.loadProductsList();
				this.selection.clear();
			});
		});
	}

	/** SELECTION */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.productsResult.length;
		return numSelected === numRows;
	}

	 /** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.productsResult.forEach(row => this.selection.select(row));
		}
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
