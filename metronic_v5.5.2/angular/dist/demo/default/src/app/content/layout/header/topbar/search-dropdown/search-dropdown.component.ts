import {
	Component,
	OnInit,
	HostBinding,
	OnDestroy,
	ElementRef,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayoutConfigService } from '../../../../../core/services/layout-config.service';
import * as objectPath from 'object-path';
import { Subscription } from 'rxjs';
import { QuickSearchDirective } from '../../../../../core/directives/quick-search.directive';
import { QuickSearchService } from '../../../../../core/services/quick-search.service';

@Component({
	selector: 'm-search-dropdown',
	templateUrl: './search-dropdown.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDropdownComponent
	implements OnInit, OnDestroy, AfterViewInit {
	onSearch: Subscription;
	onLayoutConfigUpdated: Subscription;
	@HostBinding('class') classes = '';
	@HostBinding('id') id = 'm_quicksearch';
	@HostBinding('attr.m-dropdown-toggle') attrDropdownToggle = 'click';
	@HostBinding('attr.m-dropdown-persistent') attrDropdownPersistent = '1';
	@HostBinding('attr.m-quicksearch-mode') attrQuicksearchMode = 'dropdown';

	/**
	 * Hack way to call directive programatically for the host
	 * https://stackoverflow.com/questions/41298168/how-to-dynamically-add-a-directive
	 * The official feature support is still pending
	 * https://github.com/angular/angular/issues/8785
	 */
	@HostBinding('attr.mQuickSearch')
	mQuickSearchDirective: QuickSearchDirective;

	constructor(
		private layoutConfigService: LayoutConfigService,
		private el: ElementRef,
		private quickSearchService: QuickSearchService
	) {
		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
			const config = model.config;

			this.classes =
				// tslint:disable-next-line:max-line-length
				'm-nav__item m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width m-dropdown--skin-light m-list-search m-list-search--skin-light';

			this.classes +=
				' m-dropdown--skin-' +
				objectPath.get(config, 'header.search.dropdown.skin');
		});
	}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.onSearch.unsubscribe();
	}

	ngAfterViewInit(): void {
		Promise.resolve(null).then(() => {
			this.mQuickSearchDirective = new QuickSearchDirective(this.el);
			this.mQuickSearchDirective.ngAfterViewInit();

			// listen to search event
			this.onSearch = this.mQuickSearchDirective.onSearch$.subscribe(
				(mQuickSearch: any) => {
					mQuickSearch.showProgress();
					this.quickSearchService.search().subscribe(result => {
						// append search result
						mQuickSearch.showResult(result[0]);
						mQuickSearch.hideProgress();
					});
				}
			);
		});
	}
}
