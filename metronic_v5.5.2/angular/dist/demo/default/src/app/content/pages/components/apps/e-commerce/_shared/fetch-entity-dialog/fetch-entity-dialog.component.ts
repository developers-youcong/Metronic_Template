import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'm-fetch-entity-dialog',
	templateUrl: './fetch-entity-dialog.component.html'
})
export class FetchEntityDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<FetchEntityDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}

	/** UI */
	getItemCssClassByStatus(status: number = 0) {
		switch (status) {
			case 0: return 'success';
			case 1: return 'metal';
			case 2: return 'danger';
			default: return 'success';
		}
	}
}
