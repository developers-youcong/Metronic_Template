import {Component, Inject, Input, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { SpecificationsService } from '../../../../_core/services/specification.service';
import { SpecificationModel } from '../../../../_core/models/specification.model';

@Component({
	selector: 'm-specification-edit-dialog',
	templateUrl: './specification-edit-dialog.component.html'
})
export class SpecificationEditDialogComponent implements OnInit {
	selectedNameIdForUpdate = new FormControl('', Validators.required);
	selectedValueForUpdate = new FormControl('', Validators.required);
	specificationsTypes: SpecificationModel[] = [];

	viewLoading: boolean = false;
	loadingAfterSubmit: boolean = false;


	constructor(
		public dialogRef: MatDialogRef<SpecificationEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private specificationsService: SpecificationsService
	) {
		this.selectedNameIdForUpdate.setValue(this.data.specId.toString());
		this.selectedValueForUpdate.setValue(this.data.value);
		this.specificationsTypes = this.data.specificationsTypes;
	}

	ngOnInit() {
		/* Server loading imitation. Remove this on real code */
		this.viewLoading = true;
		setTimeout(() => {
			this.viewLoading = false;
		}, 1500);
	}

	onNoClick(): void {
		this.dialogRef.close({ isUpdated : false });
	}

	save() {
		if (this.selectedValueForUpdate.invalid) {
			this.selectedValueForUpdate.markAsTouched();
			return;
		}

		if (this.selectedNameIdForUpdate.invalid) {
			this.selectedNameIdForUpdate.markAsTouched();
			return;
		}


		this.loadingAfterSubmit = true;
		this.viewLoading = true;

		const specId = +this.selectedNameIdForUpdate.value;
		/* Server loading imitation. Remove this on real code */
		setTimeout(() => {
			this.viewLoading = false;
			this.closeDialog(specId);
		}, 1500);
	}

	closeDialog(specId) {
		this.dialogRef.close({
			isUpdated: true,
			value: this.selectedValueForUpdate.value,
			specId: specId,
			_specificationName: this.getSpecificationsNameById(specId)
		});
	}

	getSpecificationsNameById(specId: number) {
		const s_index = _.findIndex(this.specificationsTypes, function (o) { return o.id === specId; });
		if (s_index > -1) {
			return this.specificationsTypes[s_index].name;
		}

		return '';
	}

	checkDataIsValid(): boolean {
		return this.selectedNameIdForUpdate.valid && this.selectedValueForUpdate.valid;
	}
}
