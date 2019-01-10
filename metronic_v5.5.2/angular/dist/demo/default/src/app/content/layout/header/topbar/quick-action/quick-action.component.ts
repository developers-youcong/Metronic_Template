import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-quick-action',
	templateUrl: './quick-action.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickActionComponent implements OnInit {
	@HostBinding('class')
	// tslint:disable-next-line:max-line-length
	classes = 'm-nav__item m-topbar__quick-actions m-topbar__quick-actions--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push m-dropdown--mobile-full-width m-dropdown--skin-light';

	@HostBinding('attr.m-dropdown-toggle') attrDropdownToggle = 'click';

	constructor() {}

	ngOnInit(): void {}
}
