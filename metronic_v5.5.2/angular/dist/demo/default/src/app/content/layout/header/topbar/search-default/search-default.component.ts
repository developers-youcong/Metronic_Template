import {
	Component,
	OnInit,
	HostBinding,
	OnDestroy,
	Input,
	ElementRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { LayoutConfigService } from '../../../../../core/services/layout-config.service';
import * as objectPath from 'object-path';
import { Subscription } from 'rxjs';

@Component({
	selector: 'm-search-default',
	templateUrl: './search-default.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDefaultComponent implements OnInit, OnDestroy {
	onLayoutConfigUpdated: Subscription;
	@HostBinding('class') classes = '';
	// @HostBinding('id') id = 'm_quicksearch';
	@HostBinding('attr.m-quicksearch-mode') attrQuickSearchMode = 'default';
	@HostBinding('attr.m-dropdown-persistent') attrDropdownPersistent = '1';

	@Input() headerSearchSkinClass: any;

	constructor(
		private layoutConfigService: LayoutConfigService,
		private el: ElementRef
	) {
		this.onLayoutConfigUpdated = this.layoutConfigService.onLayoutConfigUpdated$.subscribe(
			model => {
				const config = model.config;

				this.headerSearchSkinClass =
					'm-list-search--skin-' +
					objectPath.get(config, 'header.search.dropdown.skin');

				this.classes =
					// tslint:disable-next-line:max-line-length
					'm-stack__item m-stack__item--middle m-dropdown m-dropdown--arrow m-dropdown--large m-dropdown--mobile-full-width m-dropdown--align-right m-header-search m-header-search--expandable';

				this.classes +=
					' m-dropdown--skin-' +
					objectPath.get(config, 'header.search.dropdown.skin');
			}
		);
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.onLayoutConfigUpdated.unsubscribe();
	}
}
