import { Injectable } from '@angular/core';
import { LayoutConfigService } from '../layout-config.service';
import { ClassInitService } from '../class-init.service';
import { BehaviorSubject } from 'rxjs';
import * as objectPath from 'object-path';

@Injectable()
export class HeaderService {
	// class for the header container
	containerClass$: BehaviorSubject<string> = new BehaviorSubject('');
	// class for the header menu close
	headerMenuCloseClass$: BehaviorSubject<string> = new BehaviorSubject('');
	// toggle to display menu on header
	menuHeaderDisplay$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	// minimize offset
	attrMinimizeOffset$: BehaviorSubject<string> = new BehaviorSubject('200');
	// minimize offset on mobile
	attrMinimizeMobileOffset$: BehaviorSubject<string> = new BehaviorSubject('200');

	constructor(
		private layoutConfigService: LayoutConfigService,
		private classInitService: ClassInitService
	) {
		// subscribe to classes update
		this.classInitService.onClassesUpdated$.subscribe(classes => {
			this.headerMenuCloseClass$.next(classes.header_menu_close.join(' '));
		});

		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
			const config = model.config;

			let containerClass = '';
			const selfLayout = objectPath.get(config, 'self.layout');
			if (selfLayout === 'boxed' || selfLayout === 'wide') {
				containerClass += ' m-container--responsive m-container--xxl';
			} else {
				containerClass += ' m-container--fluid';
			}
			containerClass += ' m-container--full-height';
			this.containerClass$.next(containerClass);

			// get menu header display option
			this.menuHeaderDisplay$.next(objectPath.get(config, 'menu.header.display'));

			this.attrMinimizeOffset$.next(objectPath.get(config, 'header.self.fixed.minimize.desktop.offset'));

			this.attrMinimizeMobileOffset$.next(objectPath.get(config, 'header.self.fixed.minimize.mobile.offset'));
		});
	}
}
