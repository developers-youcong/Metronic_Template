import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-orders-list',
	templateUrl: './orders-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
