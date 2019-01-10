import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin, from, of, BehaviorSubject } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { ProductsService } from '../../_core/services/products.service';
import { SpecificationsService } from '../../_core/services/specification.service';
import { ProductRemarksService } from '../../_core/services/product-remarks.service';
import { ProductSpecificationsService } from '../../_core/services/product-specifications.service';
import { ProductModel } from '../../_core/models/product.model';
import { SpecificationModel } from '../../_core/models/specification.model';
import { TypesUtilsService } from '../../_core/utils/types-utils.service';
import { ListStateModel } from '../../_core/utils/list-state.model';
import { SubheaderService } from '../../../../../../../core/services/layout/subheader.service';
import { LayoutUtilsService, MessageType } from '../../_core/utils/layout-utils.service';

@Component({
	selector: 'm-product-edit',
	templateUrl: './product-edit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit {
	product: ProductModel;
	oldProduct: ProductModel;
	selectedTab: number = 0;
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$ = this.loadingSubject.asObservable();
	productForm: FormGroup;
	hasFormErrors: boolean = false;
	remarksListState: ListStateModel;
	specsListState: ListStateModel;
	availableYears: number[] = [];
	availableColors: string[] =
		['Red', 'CadetBlue', 'Gold', 'LightSlateGrey', 'RoyalBlue', 'Crimson', 'Blue', 'Sienna', 'Indigo', 'Green', 'Violet',
			'GoldenRod', 'OrangeRed', 'Khaki', 'Teal', 'Purple', 'Orange', 'Pink', 'Black', 'DarkTurquoise'];
	filteredColors: Observable<string[]>;
	availableManufactures: string[] =
		['Pontiac', 'Subaru', 'Mitsubishi', 'Oldsmobile', 'Chevrolet', 'Chrysler', 'Suzuki', 'GMC', 'Cadillac', 'Mercury', 'Dodge',
			'Ram', 'Lexus', 'Lamborghini', 'Honda', 'Nissan', 'Ford', 'Hyundai', 'Saab', 'Toyota'];
	availableSpecificationTypes: SpecificationModel[] = [];
	filteredManufactures: Observable<string[]>;

	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private productsService: ProductsService,
		private remarksService: ProductRemarksService,
		private specificationsService: SpecificationsService,
		private productSpecificationsService: ProductSpecificationsService,
		private typesUtilsService: TypesUtilsService,
		private productFB: FormBuilder,
		public dialog: MatDialog,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService) { }

	ngOnInit() {
		this.loadingSubject.next(true);
		this.activatedRoute.queryParams.subscribe(params => {
			const id = +params.id;
			if (id && id > 0) {
				this.productsService.getProductById(id).subscribe(res => {
					this.product = res;
					this.oldProduct = Object.assign({}, res);
					this.initProduct();
				});
			} else {
				const newProduct = new ProductModel();
				newProduct.clear();
				this.product = newProduct;
				this.oldProduct = Object.assign({}, newProduct);
				this.initProduct();
			}
		});
		for (let i = 2018; i > 1945; i--) {
			this.availableYears.push(i);
		}
	}

	initProduct() {
		this.createForm();
		this.loadLists();
		this.loadingSubject.next(false);
		if (!this.product.id) {
			this.subheaderService.setBreadcrumbs([
				{ title: 'eCommerce', page: '/ecommerce' },
				{ title: 'Products',  page: '/ecommerce/products' },
				{ title: 'Create product', page: '/ecommerce/products/add' }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit product');
		this.subheaderService.setBreadcrumbs([
			{ title: 'eCommerce', page: '/ecommerce' },
			{ title: 'Products',  page: '/ecommerce/products' },
			{ title: 'Edit product', page: '/ecommerce/products/edit', queryParams: { id: this.product.id } }
		]);
	}

	createForm() {
		this.productForm = this.productFB.group({
			model: [this.product.model, Validators.required],
			manufacture: [this.product.manufacture, Validators.required],
			modelYear: [this.product.modelYear.toString(), Validators.required],
			mileage: [this.product.mileage, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
			description: [this.product.description],
			color: [this.product.color, Validators.required],
			price: [this.product.price, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
			condition: [this.product.condition.toString(), [Validators.required, Validators.min(0), Validators.max(1)]],
			status: [this.product.status.toString(), [Validators.required, Validators.min(0), Validators.max(1)]],
			VINCode: [this.product.VINCode, Validators.required]
		});

		this.filteredManufactures = this.productForm.controls.manufacture.valueChanges
			.pipe(
				startWith(''),
				map(val => this.filterManufacture(val.toString()))
			);
		this.filteredColors = this.productForm.controls.color.valueChanges
			.pipe(
				startWith(''),
				map(val => this.filterColor(val.toString()))
		);

		this.specificationsService.getSpecs().subscribe(res => {
			this.availableSpecificationTypes = res;
		});
	}

	loadLists() {
		this.remarksListState = new ListStateModel(this.product.id);
		this.specsListState = new ListStateModel(this.product.id);
	}

	filterManufacture(val: string): string[] {
		return this.availableManufactures.filter(option =>
			option.toLowerCase().includes(val.toLowerCase()));
	}

	filterColor(val: string): string[] {
		return this.availableColors.filter(option =>
			option.toLowerCase().includes(val.toLowerCase()));
	}

	goBack(id = 0) {
		let _backUrl = 'ecommerce/products';
		if (id > 0) {
			_backUrl += '?id=' + id;
		}
		this.router.navigateByUrl(_backUrl);
	}

	refreshProduct(id = 0) {
		const _refreshUrl = 'ecommerce/products/edit?id=' + id;
		this.router.navigateByUrl(_refreshUrl);
	}

	reset() {
		this.product = Object.assign({}, this.oldProduct);
		this.createForm();
		this.hasFormErrors = false;
		this.productForm.markAsPristine();
        this.productForm.markAsUntouched();
        this.productForm.updateValueAndValidity();
	}

	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.productForm.controls;
		/** check form */
		if (this.productForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		// tslint:disable-next-line:prefer-const
		let editedProduct = this.prepareProduct();

		if (editedProduct.id > 0) {
			this.updateProduct(editedProduct, withBack);
			return;
		}
		this.addProduct(editedProduct, withBack);
	}

	prepareProduct(): ProductModel {
		const controls = this.productForm.controls;
		const _product = new ProductModel();
		_product.id = this.product.id;
		_product.model = controls['model'].value;
		_product.manufacture = controls['manufacture'].value;
		_product.modelYear = +controls['modelYear'].value;
		_product.mileage = +controls['mileage'].value;
		_product.description = controls['description'].value;
		_product.color = controls['color'].value;
		_product.price = +controls['price'].value;
		_product.condition = +controls['condition'].value;
		_product.status = +controls['status'].value;
		_product.VINCode = controls['VINCode'].value;
		_product._userId = 1; // TODO: get version from userId
		_product._createdDate = this.product._createdDate;
		_product._updatedDate = this.product._updatedDate;
		this.remarksListState.prepareState();
		this.specsListState.prepareState();
		_product._updatedDate = this.typesUtilsService.getDateStringFromDate();
		_product._createdDate = this.product.id > 0 ? _product._createdDate : _product._updatedDate;
		_product._isNew = this.product.id > 0 ? false : true;
		_product._isUpdated = this.product.id > 0;
		return _product;
	}

	addProduct(_product: ProductModel, withBack: boolean = false) {
		this.loadingSubject.next(true);
		this.productsService.createProduct(_product).subscribe(res => {
			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(res.id);
			} else {
				const message = `New product successfully has been added.`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, false);
				this.refreshProduct(res.id);
			}
		});
	}

	updateProduct(_product: ProductModel, withBack: boolean = false) {
		this.loadingSubject.next(true);
		// Update Product
		// tslint:disable-next-line:prefer-const
		let tasks$ = [this.productsService.updateProduct(_product)];

		// Update Remarks
		this.remarksListState.addedItems.forEach(element => {
			tasks$.push(this.remarksService.createRemark(element));
		});
		this.remarksListState.deletedItems.forEach(element => {
				tasks$.push(this.remarksService.deleteRemark(element));
		});
		this.remarksListState.updatedItems.forEach(element => {
				tasks$.push(this.remarksService.updateRemark(element));
		});

		// Update Specs
		this.specsListState.addedItems.forEach(element => {
			tasks$.push(this.productSpecificationsService.createSpec(element));
		});
		this.specsListState.deletedItems.forEach(element => {
			tasks$.push(this.productSpecificationsService.deleteSpec(element));
		});
		this.specsListState.updatedItems.forEach(element => {
			tasks$.push(this.productSpecificationsService.updateSpec(element));
		});

		forkJoin(tasks$).subscribe(res => {
			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(_product.id);
			} else {
				const message = `Product successfully has been saved.`;
				this.layoutUtilsService.showActionNotification(message, MessageType.Update, 10000, true, false);
				this.refreshProduct(_product.id);
			}
		});
	}

	getComponentTitle() {
		let result = 'Create product';
		if (!this.product || !this.product.id) {
			return result;
		}

		result = `Edit product - ${this.product.manufacture} ${this.product.model}, ${this.product.modelYear}`;
		return result;
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
