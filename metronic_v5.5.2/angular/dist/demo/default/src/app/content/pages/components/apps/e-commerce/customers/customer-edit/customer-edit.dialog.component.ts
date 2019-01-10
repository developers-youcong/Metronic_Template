import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypesUtilsService } from '../../_core/utils/types-utils.service';
import { CustomersService } from '../../_core/services/customers.service';
import { CustomerModel } from '../../_core/models/customer.model';

@Component({
	selector: 'm-customers-edit-dialog',
	templateUrl: './customer-edit.dialog.component.html',
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerEditDialogComponent implements OnInit {
	customer: CustomerModel;
	customerForm: FormGroup;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	loadingAfterSubmit: boolean = false;

	constructor(public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private customerService: CustomersService,
		private typesUtilsService: TypesUtilsService) { }

	/** LOAD DATA */
	ngOnInit() {
		this.customer = this.data.customer;
		this.createForm();

		/* Server loading imitation. Remove this on real code */
		this.viewLoading = true;
		setTimeout(() => {
			this.viewLoading = false;
		}, 1000);
	}

	createForm() {
		this.customer.dob = this.typesUtilsService.getDateFromString(this.customer.dateOfBbirth);
		this.customerForm = this.fb.group({
			firstName: [this.customer.firstName, Validators.required],
			lastName: [this.customer.lastName, Validators.required],
			email: [
				this.customer.email,
				[Validators.required, Validators.email]
			],
			dob: [this.customer.dob, Validators.nullValidator],
			userName: [this.customer.userName, Validators.required],
			gender: [this.customer.gender, Validators.required],
			ipAddress: [this.customer.ipAddress, Validators.required],
			type: [this.customer.type.toString(), Validators.required]
		});
	}

	/** UI */
	getTitle(): string {
		if (this.customer.id > 0) {
			return `Edit customer '${this.customer.firstName} ${
				this.customer.lastName
			}'`;
		}

		return 'New customer';
	}

	isControlInvalid(controlName: string): boolean {
		const control = this.customerForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */
	prepareCustomer(): CustomerModel {
		const controls = this.customerForm.controls;
		const _customer = new CustomerModel();
		_customer.id = this.customer.id;
		_customer.dateOfBbirth = this.typesUtilsService.dateCustomFormat(controls['dob'].value);
		_customer.firstName = controls['firstName'].value;
		_customer.lastName = controls['lastName'].value;
		_customer.email = controls['email'].value;
		_customer.userName = controls['userName'].value;
		_customer.gender = controls['gender'].value;
		_customer.ipAddress = controls['ipAddress'].value;
		_customer.type = +controls['type'].value;
		_customer.status = this.customer.status;
		return _customer;
	}

	onSubmit() {
		this.hasFormErrors = false;
		this.loadingAfterSubmit = false;
		const controls = this.customerForm.controls;
		/** check form */
		if (this.customerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		const editedCustomer = this.prepareCustomer();
		if (editedCustomer.id > 0) {
			this.updateCustomer(editedCustomer);
		} else {
			this.createCustomer(editedCustomer);
		}
	}

	updateCustomer(_customer: CustomerModel) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.customerService.updateCustomer(_customer).subscribe(res => {
			/* Server loading imitation. Remove this on real code */
			this.viewLoading = false;
			this.viewLoading = false;
			this.dialogRef.close({
				_customer,
				isEdit: true
			});
		});
	}

	createCustomer(_customer: CustomerModel) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.customerService.createCustomer(_customer).subscribe(res => {
			this.viewLoading = false;
			this.dialogRef.close({
				_customer,
				isEdit: false
			});
		});
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
