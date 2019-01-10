import {
	Component,
	OnInit,
	HostBinding,
	OnDestroy,
	ElementRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutConfigService } from '../../../../core/services/layout-config.service';
import * as objectPath from 'object-path';

@Component({
	selector: 'm-header-search',
	templateUrl: './header-search.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSearchComponent implements OnInit, OnDestroy {
	onLayoutConfigUpdated: Subscription;
	@HostBinding('class') classes = '';
	@HostBinding('attr.m-quicksearch-mode') attrQuickSearchMode = 'default';

	constructor(
		private layoutConfigService: LayoutConfigService,
		private el: ElementRef
	) {
		this.onLayoutConfigUpdated = this.layoutConfigService.onLayoutConfigUpdated$.subscribe(
			model => {
				const config = model.config;
				this.classes =
					// tslint:disable-next-line:max-line-length
					'm-stack__item m-stack__item--middle m-dropdown m-dropdown--arrow m-dropdown--large m-dropdown--mobile-full-width m-dropdown--align-right m-dropdown--skin-light m-header-search m-header-search--expandable m-header-search--skin-';
			}
		);
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.onLayoutConfigUpdated.unsubscribe();
	}
}
