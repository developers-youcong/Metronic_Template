import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as objectPath from 'object-path';
import { MenuHorizontalOffcanvasDirective } from '../../../../core/directives/menu-horizontal-offcanvas.directive';
import { MenuHorizontalDirective } from '../../../../core/directives/menu-horizontal.directive';
import { MenuHorizontalService } from '../../../../core/services/layout/menu-horizontal.service';
import { MenuConfigService } from '../../../../core/services/menu-config.service';
import { ClassInitService } from '../../../../core/services/class-init.service';

@Component({
	selector: 'm-menu-horizontal',
	templateUrl: './menu-horizontal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHorizontalComponent implements OnInit, AfterViewInit {
	@HostBinding('class') classes = '';
	@HostBinding('id') id = 'm_header_menu';

	@HostBinding('attr.mMenuHorizontalOffcanvas')
	mMenuHorOffcanvas: MenuHorizontalOffcanvasDirective;
	@HostBinding('attr.mMenuHorizontal')
	mMenuHorizontal: MenuHorizontalDirective;

	currentRouteUrl: any = '';
	activeItem: any;
	itemsWithAsides = [];

	constructor(
		private el: ElementRef,
		public classInitService: ClassInitService,
		public menuHorService: MenuHorizontalService,
		private menuConfigService: MenuConfigService,
		private router: Router,
	) {
		this.classes = this.menuHorService.menuClasses;
	}

	ngAfterViewInit(): void {
		Promise.resolve(null).then(() => {
			this.mMenuHorOffcanvas = new MenuHorizontalOffcanvasDirective(this.el);
			this.mMenuHorOffcanvas.ngAfterViewInit();

			this.mMenuHorizontal = new MenuHorizontalDirective(this.el);
			this.mMenuHorizontal.ngAfterViewInit();
		});
	}

	ngOnInit(): void {
		this.currentRouteUrl = this.router.url;
		this.menuHorService.menuList$.subscribe(menuItems => this.fillAsides(menuItems));

		this.shouldOverrideAsides();

		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url;
				this.shouldOverrideAsides();
			});
	}

	shouldOverrideAsides() {
		const aside = this.getActiveItemAside();
		if (aside) {
			// override aside menu as secondary menu of current header menu
			this.menuConfigService.configModel.config.aside = aside;
			this.menuConfigService.setModel(this.menuConfigService.configModel);
		}
	}

	fillAsides(menuItems) {
		for (const menuItem of menuItems) {
			if (menuItem.aside) {
				this.itemsWithAsides.push(menuItem);
			}

			if (menuItem.submenu && menuItem.submenu.items) {
				this.fillAsides(menuItem.submenu.items);
			}
		}
	}

	getActiveItemAside() {
		if (this.currentRouteUrl === '') {
			return null;
		}

		for (const item of this.itemsWithAsides) {
			if (item.page && item.page === this.currentRouteUrl) {
				return item.aside;
			}
		}
	}

	getItemCssClasses(menuItem) {
		let cssClasses = 'm-menu__item';

		if (objectPath.get(menuItem, 'submenu')) {
			cssClasses += ' m-menu__item--submenu';
		}

		if (objectPath.get(menuItem, 'resizer')) {
			cssClasses += ' m-menu__item--resize';
		}

		if (
			(objectPath.get(menuItem, 'root') &&
				objectPath.get(menuItem, 'submenu.type') === 'classic') ||
			parseInt(objectPath.get(menuItem, 'submenu.width'), 2) > 0
		) {
			cssClasses += ' m-menu__item--rel';
		}

		const customClass = objectPath.get(menuItem, 'custom-class');
		if (customClass) {
			cssClasses += ' ' + customClass;
		}

		if (objectPath.get(menuItem, 'icon-only')) {
			cssClasses += ' m-menu__item--icon-only';
		}

		if (menuItem.submenu && this.isMenuItemIsActive(menuItem)) {
			cssClasses += ' m-menu__item--active';
		}

		return cssClasses;
	}

	getItemAttrLinkRedirect(menuItem): any {
		if (objectPath.get(menuItem, 'redirect')) {
			return '1';
		}

		return null;
	}

	getItemAttrResizeDesktopBreakpoint(menuItem) {
		if (objectPath.get(menuItem, 'resizer')) {
			return objectPath.get(menuItem, 'resize-breakpoint');
		}

		return null;
	}

	getItemAttrSubmenuToggle(menuItem) {
		let attrSubmenuToggle = 'hover';
		if (objectPath.get(menuItem, 'toggle') === 'click') {
			attrSubmenuToggle = 'click';
		} else if (objectPath.get(menuItem, 'submenu.type') === 'tabs') {
			attrSubmenuToggle = 'tabs';
		} else {
			// submenu toggle default to 'hover'
		}

		return attrSubmenuToggle;
	}

	getItemAttrSubmenuMode(menuItem) {
		return null;
	}

	getItemMenuSubmenuClass(menuItem) {
		let subClass = '';

		const subAlignment = objectPath.get(menuItem, 'submenu.alignment');
		if (subAlignment) {
			subClass += ' m-menu__submenu--' + subAlignment;
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'classic') {
			subClass += ' m-menu__submenu--classic';
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'tabs') {
			subClass += ' m-menu__submenu--tabs';
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'mega') {
			if (objectPath.get(menuItem, 'submenu.width')) {
				subClass += ' m-menu__submenu--fixed';
			}
		}

		if (objectPath.get(menuItem, 'submenu.pull')) {
			subClass += ' m-menu__submenu--pull';
		}

		return subClass;
	}

	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		return item.page === this.currentRouteUrl;
	}

	isMenuRootItemIsActive(item): boolean {
		let result: boolean = false;

		for (const subItem of item.submenu) {
			result = this.isMenuItemIsActive(subItem);
			if (result) {
				return true;
			}
		}

		return false;
	}
}
