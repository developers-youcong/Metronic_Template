import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PageConfigService } from '../page-config.service';
import { MenuConfigService } from '../menu-config.service';
import { UtilsService } from '../utils.service';
import * as objectPath from 'object-path';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../../models/breadcrumb';

@Injectable()
export class SubheaderService {
	title$: BehaviorSubject<string> = new BehaviorSubject('');
	breadcrumbs$: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject([]);
	disabled$: Subject<boolean> = new Subject<boolean>();

	private manualBreadcrumbs: any = {};
	private appendingBreadcrumbs: any = {};
	private manualTitle: any = {};

	private asideMenus: any;
	private headerMenus: any;
	private config: any;
	pageConfig: any;

	constructor(
		private router: Router,
		private pageConfigService: PageConfigService,
		private menuConfigService: MenuConfigService,
		private utils: UtilsService
	) {
		// get updated title current page config
		this.pageConfigService.onPageUpdated$.subscribe(model => {
			this.config = model.config;
			this.pageConfig = objectPath.get(this.config, this.router.url.substring(1).replace(/\//g, '.') || '/');

			// update page title on initial page load
			this.title$.next(objectPath.get(this.pageConfig, 'page.title'));

			// subheader enable/disable
			const hideSubheader = objectPath.get(this.pageConfig, 'page.subheader');
			setTimeout(() => this.disabled$.next(typeof hideSubheader !== 'undefined' && !hideSubheader));
		});

		this.menuConfigService.onMenuUpdated$.subscribe(model => {
			this.headerMenus = objectPath.get(model, 'config.header');
			this.asideMenus = objectPath.get(model, 'config.aside');
			// update breadcrumb on initial page load
			this.updateBreadcrumbs();
		});

		// subscribe to router events
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.pageConfig = objectPath.get(this.config, this.router.url.substring(1).replace(/\//g, '.') || '/');

				if (objectPath.get(this.manualTitle, this.router.url)) {
					this.setTitle(this.manualTitle[this.router.url]);
				} else {
					// get updated page title on every route changed
					this.title$.next(objectPath.get(this.pageConfig, 'page.title'));

					// subheader enable/disable
					const hideSubheader = objectPath.get(this.pageConfig, 'page.subheader');
					this.disabled$.next(typeof hideSubheader !== 'undefined' && !hideSubheader);

					if (objectPath.get(this.manualBreadcrumbs, this.router.url)) {
						// breadcrumbs was set manually
						this.setBreadcrumbs(this.manualBreadcrumbs[this.router.url]);
					} else {
						// get updated breadcrumbs on every route changed
						this.updateBreadcrumbs();
						// breadcrumbs was appended before, reuse it for this page
						if (objectPath.get(this.appendingBreadcrumbs, this.router.url)) {
							this.appendBreadcrumbs(this.appendingBreadcrumbs[this.router.url]);
						}
					}
				}
			});
	}

	updateBreadcrumbs() {
		// get breadcrumbs from header menu
		let breadcrumbs = this.getBreadcrumbs(this.headerMenus);
		// if breadcrumbs empty from header menu
		if (breadcrumbs.length === 0) {
			// get breadcrumbs from aside menu
			breadcrumbs = this.getBreadcrumbs(this.asideMenus);
		}

		if (
			// if breadcrumb has only 1 item
			breadcrumbs.length === 1 &&
			// and breadcrumb title is same as current page title
			breadcrumbs[0].title === this.title$.getValue()
		) {
			// no need to display on frontend
			breadcrumbs = [];
		}

		this.breadcrumbs$.next(breadcrumbs);
	}

	/**
	 * Manually set full breadcrumb paths
	 */
	setBreadcrumbs(breadcrumbs: Breadcrumb[] | any[]) {
		this.manualBreadcrumbs[this.router.url] = breadcrumbs;
		this.breadcrumbs$.next(breadcrumbs);
	}

	/**
	 * Append breadcrumb to the last existing breadcrumbs
	 * @param breadcrumbs
	 */
	appendBreadcrumbs(breadcrumbs: Breadcrumb[] | any[]) {
		this.appendingBreadcrumbs[this.router.url] = breadcrumbs;
		const prev = this.breadcrumbs$.getValue();
		this.breadcrumbs$.next(prev.concat(breadcrumbs));
	}

	/**
	 * Get breadcrumbs from menu items
	 * @param menus
	 */
	getBreadcrumbs(menus: any) {
		const breadcrumbs = [];
		const menuPath = this.getPath(menus, this.router.url);
		menuPath.forEach(key => {
			menus = menus[key];
			if (typeof menus !== 'undefined' && menus.title) {
				breadcrumbs.push(menus);
			}
		});
		return breadcrumbs;
	}

	setTitle(title: string) {
		this.manualTitle[this.router.url] = title;
		this.title$.next(title);
	}

	/**
	 * Get object path by value
	 * @param obj
	 * @param value
	 */
	getPath(obj, value) {
		if (typeof obj !== 'object') {
			throw new TypeError('Can only operate on Array or Object');
		}
		const path = [];
		let found = false;

		function search(haystack) {
			// tslint:disable-next-line:forin
			for (const key in haystack) {
				path.push(key);
				if (haystack[key] === value) {
					found = true;
					break;
				}
				if (typeof haystack[key] === 'object') {
					search(haystack[key]);
					if (found) {
						break;
					}
				}
				path.pop();
			}
		}

		search(obj);
		return path;
	}
}
