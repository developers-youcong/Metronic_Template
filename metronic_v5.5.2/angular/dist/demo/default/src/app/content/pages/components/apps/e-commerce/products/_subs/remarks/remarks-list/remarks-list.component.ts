import { Component, OnInit, ElementRef, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// Material
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// RXJS
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge, BehaviorSubject } from 'rxjs';
// Services
import { TypesUtilsService } from '../../../../_core/utils/types-utils.service';
import { LayoutUtilsService, MessageType } from '../../../../_core/utils/layout-utils.service';
import { ProductRemarksService } from '../../../../_core/services/product-remarks.service';
// Models
import { ProductRemarkModel } from '../../../../_core/models/product-remark.model';
import { ProductRemarksDataSource } from '../../../../_core/models/data-sources/product-remarks.datasource';
import { QueryParamsModel } from '../../../../_core/models/query-models/query-params.model';
import { ListStateModel, StateActions } from '../../../../_core/utils/list-state.model';

// Table with EDIT item in new page
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	selector: 'm-remarks-list',
	templateUrl: './remarks-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemarksListComponent implements OnInit {
	// Incoming data
	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	@Input() remarksListState: ListStateModel;
	// Table fields
	dataSource: ProductRemarksDataSource;
	displayedColumns = ['select', 'id', 'text', 'type', 'dueDate', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	// Selection
	selection = new SelectionModel<ProductRemarkModel>(true, []);
	productRemarksResult: ProductRemarkModel[] = [];
	// Add and Edit
	isSwitchedToEditMode: boolean = false;
	loadingAfterSubmit: boolean = false;
	formGroup: FormGroup;
	remarkForEdit: ProductRemarkModel;
	remarkForAdd: ProductRemarkModel;

	constructor(private productRemraksService: ProductRemarksService,
		private fb: FormBuilder,
		public dialog: MatDialog,
		public typesUtilsService: TypesUtilsService,
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
					this.loadRemarksList();
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
					this.loadRemarksList();
				})
			)
			.subscribe();

		// Init DataSource
		this.dataSource = new ProductRemarksDataSource(this.productRemraksService);
		// this loading binded to parent component loading
		this.dataSource.loading$.subscribe(res => {
			this.loadingSubject.next(res);
		});
		this.loadRemarksList(true);
		this.dataSource.entitySubject.subscribe(res => this.productRemarksResult = res);
		this.createFormGroup();
	}

	// Loading
	loadRemarksList(_isFirstLoading: boolean = false) {
		let queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		if (_isFirstLoading) {
			queryParams = new QueryParamsModel(this.filterConfiguration(), 'asc', 'id', 0, 5);
		}
		this.dataSource.loadRemarks(queryParams, this.remarksListState);
	}

	// Add+Edit forms | FormGroup
	createFormGroup(_item = null) {
		// 'edit' prefix - for item editing
		// 'add' prefix - for item creation
		this.formGroup = this.fb.group({
			editText: ['', Validators.required],
			editType: ['0'],
			editDueDate: [this.typesUtilsService.getDateFromString(), Validators.required],
			newText: ['', Validators.required],
			newType: ['0'],
			newDueDate: [this.typesUtilsService.getDateFromString(), Validators.required]
		});
		this.clearAddForm();
		this.clearEditForm();
	}

	// ADD REMARK FUNCTIONS: clearAddForm | checkAddForm | addRemarkButtonOnClick | cancelAddButtonOnClick | saveNewRemark
	clearAddForm() {
		const controls = this.formGroup.controls;
		controls['newText'].setValue('');
		controls['newText'].markAsPristine();
		controls['newText'].markAsUntouched();
		controls['newType'].setValue('0');
		controls['newType'].markAsPristine();
		controls['newType'].markAsUntouched();
		controls['newDueDate'].setValue(this.typesUtilsService.getDateFromString());
		controls['newDueDate'].markAsPristine();
		controls['newDueDate'].markAsUntouched();

		this.remarkForAdd = new ProductRemarkModel();
		this.remarkForAdd.clear(this.remarksListState.entityId);
		this.remarkForAdd.dueDate = this.typesUtilsService.getDateStringFromDate();
		this.remarkForAdd._isEditMode = false;
	}

	checkAddForm() {
		const controls = this.formGroup.controls;
		if (controls['newText'].invalid || controls['newType'].invalid || controls['newDueDate'].invalid) {
			controls['newText'].markAsTouched();
			// controls['newType'].markAsTouched();
			controls['newDueDate'].markAsTouched();
			return false;
		}

		return true;
	}

	addRemarkButtonOnClick() {
		this.clearAddForm();
		this.remarkForAdd._isEditMode = true;
		this.isSwitchedToEditMode = true;
	}

	cancelAddButtonOnClick() {
		this.remarkForAdd._isEditMode = false;
		this.isSwitchedToEditMode = false;
	}

	saveNewRemark() {
		if (!this.checkAddForm()) {
			return;
		}

		this.loadingAfterSubmit = true;
		const controls = this.formGroup.controls;
		/* Server loading imitation. Remove 'setTemout' on real code */
		setTimeout(() => {
			this.loadingAfterSubmit = false;
			this.remarkForAdd._isEditMode = false;
			this.remarkForAdd.text = controls['newText'].value;
			this.remarkForAdd.type = +controls['newType'].value;
			const _date = new Date(controls['newDueDate'].value);
			this.remarkForAdd.dueDate = this.typesUtilsService.getDateStringFromDate(_date);
			this.remarkForAdd._updatedDate = this.typesUtilsService.getDateStringFromDate();
			this.remarkForAdd._createdDate = this.remarkForEdit._updatedDate;
			this.remarkForAdd._userId = 1; // Admin TODO: Get from user servics
			this.remarksListState.setItem(this.remarkForAdd, StateActions.CREATE);
			this.loadRemarksList();
			const _saveMessage = `Remark has been created`;
			this.isSwitchedToEditMode = false;
			this.layoutUtilsService.showActionNotification(_saveMessage, MessageType.Create, 10000, true, false);
			this.clearAddForm();
		}, 1500);
	}

	// EDIT REMARK FUNCTIONS: clearEditForm | checkEditForm | editRemarkButtonOnClick | cancelEditButtonOnClick |
	clearEditForm() {
		const controls = this.formGroup.controls;
		controls['editText'].setValue('');
		// controls['editText'].markAsPristine();
		// controls['editText'].markAsUntouched();
		controls['editType'].setValue('0');
		// controls['editType'].markAsPristine();
		// controls['editType'].markAsUntouched();
		controls['editDueDate'].setValue(this.typesUtilsService.getDateFromString());
		// controls['editDueDate'].markAsPristine();
		// controls['editDueDate'].markAsUntouched();

		this.remarkForEdit = new ProductRemarkModel();
		this.remarkForEdit.clear(this.remarksListState.entityId);
		this.remarkForEdit.dueDate = this.typesUtilsService.getDateStringFromDate();
		this.remarkForEdit._isEditMode = false;
	}

	checkEditForm() {
		const controls = this.formGroup.controls;
		if (controls['editText'].invalid || controls['editType'].invalid || controls['editDueDate'].invalid) {
			// controls['editText'].markAsTouched();
			// controls['editType'].markAsTouched();
			// controls['editDueDate'].markAsTouched();
			return false;
		}

		return true;
	}

	editRemarkButtonOnClick(_item: ProductRemarkModel) {
		const controls = this.formGroup.controls;
		controls['editText'].setValue(_item.text);
		controls['editType'].setValue(_item.type.toString());
		controls['editDueDate'].setValue(this.typesUtilsService.getDateFromString(_item.dueDate));
		_item._isEditMode = true;
		this.isSwitchedToEditMode = true;
	}

	cancelEditButtonOnClick(_item: ProductRemarkModel) {
		_item._isEditMode = false;
		this.isSwitchedToEditMode = false;
	}

	saveUpdatedRemark(_item: ProductRemarkModel) {
		if (!this.checkEditForm()) {
			return;
		}

		this.loadingAfterSubmit = true;
		/* Server loading imitation. Remove 'setTemout' on real code */
		setTimeout(() => {
			const controls = this.formGroup.controls;
			this.loadingAfterSubmit = false;
			_item.text = controls['editText'].value;
			_item.type = +controls['editType'].value;
			const _date = new Date(controls['editDueDate'].value);
			_item.dueDate = this.typesUtilsService.getDateStringFromDate(_date);
			_item._updatedDate = this.typesUtilsService.getDateStringFromDate();
			_item._isEditMode = false;
			this.remarksListState.setItem(_item, StateActions.UPDATE);
			const saveMessage = `Remark has been updated`;
			this.isSwitchedToEditMode = false;
			this.layoutUtilsService.showActionNotification(saveMessage, MessageType.Update, 10000, true, false);
		}, 1500);
	}


	/** FILTRATION */
	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		filter.text = searchText;
		return filter;
	}

	/** SELECTION */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.productRemarksResult.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			this.productRemarksResult.forEach(row => this.selection.select(row));
		}
	}

	/** ACTIONS */
	/** Delete */
	deleteRemark(_item: ProductRemarkModel) {
		const _title: string = 'Remark Delete';
		const _description: string = 'Are you sure to permanently delete this remark?';
		const _waitDesciption: string = 'Remark is deleting...';
		const _deleteMessage = `Remark has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			_item._isDeleted = true;
			this.remarksListState.setItem(_item, StateActions.DELETE);
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.loadRemarksList();
		});
	}

	deleteRemarks() {
		const _title: string = 'Remarks Delete';
		const _description: string = 'Are you sure to permanently delete selected remarks?';
		const _waitDesciption: string = 'Remarks are deleting...';
		const _deleteMessage = 'Selected remarks have been deleted';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const length = this.selection.selected.length;
			for (let i = 0; i < length; i++) {
				this.selection.selected[i]._isDeleted = true;
				this.remarksListState.setItem(this.selection.selected[i], StateActions.DELETE);
			}
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.loadRemarksList();
			this.selection.clear();
		});
	}

	/** Fetch */
	fetchRemarks() {
		const messages = [];
		this.selection.selected.forEach(elem => { messages.push({ text: `${elem.text}`, id: elem.id }); });
		this.layoutUtilsService.fetchElements(messages);
	}

	/* UI **/
	getTypeStr(_remark: ProductRemarkModel): string {
		switch (_remark.type) {
			case 0: return 'Info';
			case 1: return 'Note';
			case 2: return 'Reminder';
			default: return '';
		}
	}
}
