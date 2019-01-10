import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'm-timeline-item',
	templateUrl: './timeline-item.component.html',
	styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent implements OnInit {
	@Input() item: any;

	@HostBinding('class') classes = 'm-list-timeline__item';

	constructor() {}

	ngOnInit() {
		if (this.item.read) {
			this.classes += ' m-list-timeline__item--read';
		}
	}

	badgeClass() {
		const badges: any = {
			urgent: 'm-badge--info',
			important: 'm-badge--warning',
			resolved: 'm-badge--success',
			pending: 'm-badge--danger'
		};
		if (this.item.tags.length > 0) {
			return badges[this.item.tags[0]];
		}
	}
}
