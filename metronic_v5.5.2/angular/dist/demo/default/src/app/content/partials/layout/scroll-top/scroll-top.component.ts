import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-scroll-top',
	templateUrl: './scroll-top.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollTopComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
