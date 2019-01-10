import {Component, OnInit, HostBinding, Input, Inject, ChangeDetectionStrategy} from '@angular/core';
import { ClassInitService } from '../../../../core/services/class-init.service';
import { LayoutConfigService } from '../../../../core/services/layout-config.service';
import * as objectPath from 'object-path';
import {DOCUMENT} from '@angular/common';

@Component({
	selector: 'm-brand',
	templateUrl: './brand.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandComponent implements OnInit {
	@HostBinding('class') classes = 'm-stack__item m-brand';
	@Input() menuAsideLeftSkin: any = '';
	@Input() menuAsideMinimizeDefault: any = false;
	@Input() menuAsideMinimizToggle: any = false;
	@Input() menuAsideDisplay: any = false;
	@Input() menuHeaderDisplay: any = true;
	@Input() headerLogo: any = '';

	constructor(
		private classInitService: ClassInitService,
		private layoutConfigService: LayoutConfigService,
		@Inject(DOCUMENT) private document: Document
	) {
		// subscribe to class update event
		this.classInitService.onClassesUpdated$.subscribe(classes => {
			this.classes = 'm-stack__item m-brand ' + classes.brand.join(' ');
		});

		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
			this.menuAsideLeftSkin = objectPath.get(
				model,
				'config.aside.left.skin'
			);

			this.menuAsideMinimizeDefault = objectPath.get(
				model,
				'config.aside.left.minimize.default'
			);

			this.menuAsideMinimizToggle = objectPath.get(
				model,
				'config.aside.left.minimize.toggle'
			);

			this.menuAsideDisplay = objectPath.get(
				model,
				'config.menu.aside.display'
			);

			this.menuHeaderDisplay = objectPath.get(
				model,
				'config.menu.header.display'
			);

			const headerLogo = objectPath.get(model, 'config.header.self.logo');
			if (typeof headerLogo === 'object') {
				this.headerLogo = objectPath.get(
					headerLogo,
					this.menuAsideLeftSkin
				);
			} else {
				this.headerLogo = headerLogo;
			}
		});
	}

	ngOnInit(): void {}

	/**
	 * Toggle class topbar show/hide
	 * @param event
	 */
	clickTopbarToggle(event: Event): void {
		this.document.body.classList.toggle('m-topbar--on');
	}
}
