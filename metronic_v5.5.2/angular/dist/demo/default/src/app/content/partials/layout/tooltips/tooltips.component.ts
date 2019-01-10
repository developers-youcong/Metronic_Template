import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-tooltips',
	templateUrl: './tooltips.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipsComponent implements OnInit {
	@HostBinding('class') classes = 'm-nav-sticky';
	@HostBinding('style.margin-top') marginTop = '30px';

	constructor() {}

	ngOnInit(): void {}
}
