import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-notice',
	templateUrl: './notice.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeComponent implements OnInit {
	@Input() classes: any = '';
	@Input() icon: any;

	constructor() {}

	ngOnInit() {
		if (this.icon) {
			this.classes += ' m-alert--icon';
		}
	}
}
