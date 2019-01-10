import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as objectPath from 'object-path';
import { LayoutConfigService } from './layout-config.service';
import { ConfigModel } from '../interfaces/config';

@Injectable()
export class ClassInitService {
	public config: any;

	public classes: any = {};
	public attributes: any = {};

	public onClassesUpdated$: BehaviorSubject<any>;
	public onAttributeUpdated$: BehaviorSubject<any>;

	constructor(private layoutConfigService: LayoutConfigService) {
		// scope list of classes
		this.classes = {
			body: [],
			brand: [],
			header: [],
			header_menu: [],
			header_menu_nav: [],
			header_menu_close: [],
			aside_menu: [],
			aside_menu_nav: [],
			aside_left: [],
			aside_left_close: []
		};
		// scope list of attributes
		this.attributes = {
			body: {},
			header: {},
			aside_menu: {}
		};

		this.onClassesUpdated$ = new BehaviorSubject(this.classes);
		this.onAttributeUpdated$ = new BehaviorSubject(this.attributes);
	}

	setConfig(model: ConfigModel): void {
		this.config = model.config;

		// scope list of classes
		this.classes = {
			body: [],
			brand: [],
			header: [],
			header_menu: [],
			header_menu_nav: [],
			header_menu_close: [],
			aside_menu: [],
			aside_menu_nav: [],
			aside_left: [],
			aside_left_close: []
		};
		// scope list of attributes
		this.attributes = {
			body: {},
			header: {},
			aside_menu: {}
		};

		// init base layout
		this.initLayout();
		this.initLoader();
		this.initContent();

		// init header and header menu
		this.initHeader();
		this.initHeaderMenuDesktop();
		this.initHeaderMenuMobile();

		// init aside and aside menu
		this.initAsideLeft();
		this.initAsideMenu();

		// init other asides
		this.initAsideRight();

		// init footer
		this.initFooter();

		// init quick sidebar
		this.initQuickSidebar();

		this.onClassesUpdated$.next(this.classes);
		this.onAttributeUpdated$.next(this.attributes);
	}

	initLayout(): void {
		const layout = objectPath.get(this.config, 'self.layout');
		if (layout) {
			this.classes.body.push('m-page--' + layout);
		}

		if (objectPath.has(this.config, 'self.skin')) {
			this.classes.body.push(
				'm--skin-' + objectPath.get(this.config, 'self.skin')
			);
		}
	}

	initLoader(): void {
		// this.classes.body.push('m-page--loading-enabled');
		// this.classes.body.push('m-page--loading-non-block');
	}

	initHeader(): void {
		if (objectPath.get(this.config, 'header.self.fixed.desktop')) {
			this.classes.body.push('m-header--fixed');
		} else {
			this.classes.body.push('m-header--static');
		}

		if (objectPath.get(this.config, 'header.self.fixed.mobile')) {
			this.classes.body.push('m-header--fixed-mobile');
		}

		this.classes.brand.push(
			'm-brand--skin-' + objectPath.get(this.config, 'aside.left.skin')
		);
	}

	initHeaderMenuDesktop(): void {
		this.classes.header_menu.push(
			'm-header-menu--skin-' +
				objectPath.get(this.config, 'menu.header.desktop.skin')
		);
		this.classes.header_menu.push(
			'm-header-menu--submenu-skin-' +
				objectPath.get(this.config, 'menu.header.desktop.submenu.skin')
		);

		if (objectPath.get(this.config, 'menu.header.desktop.arrow')) {
			this.classes.header_menu_nav.push('m-menu__nav--submenu-arrow');
		}
	}

	initHeaderMenuMobile(): void {
		this.classes.header_menu.push(
			'm-aside-header-menu-mobile--skin-' +
				objectPath.get(this.config, 'aside.left.skin')
		);
		this.classes.header_menu_close.push(
			'm-aside-header-menu-mobile-close--skin-' +
				objectPath.get(this.config, 'aside.left.skin')
		);
		this.classes.header_menu.push(
			'm-aside-header-menu-mobile--submenu-skin-' +
				objectPath.get(this.config, 'aside.left.skin')
		);
	}

	initAsideMenu(): void {
		// skin
		this.classes.aside_menu.push(
			'm-aside-menu--skin-' +
				objectPath.get(this.config, 'aside.left.skin')
		);

		if (
			objectPath.get(
				this.config,
				'menu.aside.desktop_and_mobile.submenu.skin'
			) === 'inherit'
		) {
			this.classes.aside_menu.push(
				'm-aside-menu--submenu-skin-' +
					objectPath.get(this.config, 'aside.left.skin')
			);
		} else {
			this.classes.aside_menu.push(
				'm-aside-menu--submenu-skin-' +
					objectPath.get(
						this.config,
						'menu.aside.desktop_and_mobile.submenu.skin'
					)
			);
		}

		// dropdown submenu
		if (
			!objectPath.get(
				this.config,
				'menu.aside.desktop_and_mobile.submenu.accordion'
			)
		) {
			this.classes.aside_menu.push('m-aside-menu--dropdown');
			this.attributes.aside_menu['m-menu-dropdown'] = '1';
		}

		// scrollable menu
		if (objectPath.get(this.config, 'aside.left.fixed')) {
			this.attributes.aside_menu['m-menu-scrollable'] = 1;
		} else {
			this.attributes.aside_menu['m-menu-scrollable'] = 0;
		}

		// menu root level item highlight type
		// option not found
		if (objectPath.get(this.config, 'menu.aside.root-active-style')) {
			this.classes.aside_menu.push('m-aside-menu--active-item-border');
		}

		if (objectPath.get(this.config, 'menu.aside.minimize.submenu_type')) {
			this.classes.aside_menu.push(
				'm-aside-menu--minimize-submenu-compact'
			);
		}

		if (
			objectPath.has(
				this.config,
				'menu.aside.desktop_and_mobile.submenu.dropdown.hover_timeout'
			)
		) {
			this.attributes.aside_menu[
				'm-menu-dropdown-timeout'
			] = objectPath.get(
				this.config,
				'menu.aside.desktop_and_mobile.submenu.dropdown.hover_timeout'
			);
		}
	}

	initAsideLeft(): void {
		if (!objectPath.get(this.config, 'aside.left.display')) {
			return;
		}

		this.classes.body.push('m-aside-left--enabled');
		this.classes.aside_left.push(
			'm-aside-left--skin-' +
				objectPath.get(this.config, 'aside.left.skin')
		);
		this.classes.aside_left_close.push(
			'm-aside-left-close--skin-' +
				objectPath.get(this.config, 'aside.left.skin')
		);
		this.classes.body.push(
			'm-aside-left--skin-' +
				objectPath.get(this.config, 'aside.left.skin')
		);

		// fixed aside
		if (objectPath.get(this.config, 'aside.left.fixed')) {
			this.classes.body.push('m-aside-left--fixed');
		}

		// offcanvas aside
		if (objectPath.get(this.config, 'aside.left.offcanvas.default')) {
			this.classes.aside_left.push('m-aside-left--offcanvas-default');
		} else {
			this.classes.body.push('m-aside-left--offcanvas');
		}

		// minimized aside for desktop mode
		if (objectPath.get(this.config, 'aside.left.minimize.default')) {
			this.classes.body.push('m-aside-left--minimize');
			this.classes.body.push('m-brand--minimize');
		}

		// hidable aside
		if (objectPath.get(this.config, 'aside.left.hide.default')) {
			this.classes.body.push('m-aside-left--hide');
		}
	}

	initAsideRight(): void {
		if (!objectPath.get(this.config, 'aside.right.display')) {
			return;
		}

		this.classes.body.push('m-aside-right--enabled');
	}

	initContent(): void {
		if (objectPath.get(this.config, 'self.layout') !== 'blank') {
			this.classes.body.push(
				'm-content--skin-' + objectPath.get(this.config, 'content.skin')
			);
		}
	}

	initFooter(): void {
		if (
			objectPath.get(this.config, 'footer.fixed') &&
			objectPath.get(this.config, 'self.layout') !== 'boxed'
		) {
			this.classes.body.push('m-footer--fixed');
		}
		if (
			objectPath.get(this.config, 'aside.left.push_footer') ||
			objectPath.get(this.config, 'aside.left.fixed')
		) {
			this.classes.body.push('m-footer--push');
		}
	}

	initQuickSidebar(): void {
		if (objectPath.get(this.config, 'quicksidebar.display')) {
			this.classes.body.push('m-aside--offcanvas-default');
		}
	}
}
