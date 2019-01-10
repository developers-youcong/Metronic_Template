import { Component, Inject, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'm-alert',
	templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

	@Input() type: 'primary | accent | warn';
	@Input() duration: number = 0;
	@Input() showCloseButton: boolean = true;
	@Output() close = new EventEmitter<boolean>();

	alertShowing: boolean = true;

	ngOnInit() {
		if (this.duration === 0) {
			return;
		}

		setTimeout(() => {
			this.closeAlert();
		}, this.duration);
	}

	closeAlert() {
		this.close.emit();
	}
}
