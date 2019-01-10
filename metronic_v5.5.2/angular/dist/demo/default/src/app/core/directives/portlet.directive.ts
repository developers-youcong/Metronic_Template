import {
	Directive,
	AfterViewInit,
	OnDestroy,
	ElementRef,
	HostListener,
	OnInit,
	Input,
	HostBinding
} from '@angular/core';
import { LayoutRefService } from '../services/layout/layout-ref.service';
import { Router } from '@angular/router';
import * as objectPath from 'object-path';
import { LayoutConfigService } from '../services/layout-config.service';
import { combineLatest } from 'rxjs';

interface PortletOptions {
	enableSticky?: boolean;
	headOverflay?: boolean;
	headLarge?: boolean;
	class?: string[];
}

@Directive({
	selector: '[mPortlet]'
})
export class PortletDirective implements AfterViewInit, OnDestroy, OnInit {
	portlet: any;

	@Input() options: PortletOptions;
	@HostBinding('class') class: any;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if (this.portlet instanceof mPortlet && objectPath.get(this.options, 'enableSticky')) {
			this.portlet.updateSticky();
		}
	}

	constructor(
		private el: ElementRef,
		private layoutRefService: LayoutRefService,
		private layoutConfigService: LayoutConfigService
	) {
		this.class = this.el.nativeElement.classList;
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		const cls = objectPath.get(this.options, 'class');
		if (Array.isArray(cls)) {
			cls.forEach((c) => {
				this.class.add(c);
			});
		} else if (cls) {
			this.class.add(cls);
		}

		if (objectPath.get(this.options, 'enableSticky')) {
			combineLatest(
				this.layoutRefService.layoutRefs$,
				this.layoutConfigService.onLayoutConfigUpdated$
			).subscribe((result) => {
				if (this.portlet instanceof mPortlet) {
					this.portlet.updateSticky();
				} else {
					this.initPortlet(result[0], result[1]);
				}
			});
		}

		if (objectPath.get(this.options, 'headOverlay')) {
			this.class.add('m-portlet--head-overlay');
		}

		if (objectPath.get(this.options, 'headLarge')) {
			this.class.add('m-portlet--head-lg');
		}
	}

	initPortlet(res, config) {
		if (typeof res === undefined || res === null) {
			return;
		}

		// check if all the required element exist
		let hasAllParts = true;
		['header', 'content', 'asideLeft'].forEach((part) => {
			if (!res.hasOwnProperty(part)) {
				hasAllParts = false;
			}
		});
		if (!hasAllParts) {
			return;
		}

		const headerHeight = parseInt(window.getComputedStyle(objectPath.get(res, 'header'))['height'], null);
		const contentEl = window.getComputedStyle(objectPath.get(res, 'content'));
		const asideLeftEl = window.getComputedStyle(objectPath.get(res, 'asideLeft'));

		const options = {
			sticky: {
				offset: headerHeight + parseInt(objectPath.get(config, 'config.portlet.sticky.offset') || 0, null),
				zIndex: 100,
				position: {
					top: () => {
						return headerHeight;
					},
					left: () => {
						let left = parseInt(contentEl['paddingLeft'], null);

						if (mUtil.isInResponsiveRange('desktop')) {
							left += parseInt(asideLeftEl['width'], null);
						}

						return left;
					},
					right: () => {
						return parseInt(contentEl['paddingRight'], null);
					}
				}
			}
		};

		this.options = Object.assign(this.options, options);

		this.portlet = new mPortlet(this.el.nativeElement, this.options);

		this.portlet.initSticky();
	}

	ngOnDestroy(): void {
		if (this.portlet instanceof mPortlet && objectPath.get(this.options, 'enableSticky')) {
			this.portlet.destroySticky();
		}
	}
}
