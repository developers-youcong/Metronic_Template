import { UtilsService } from '../services/utils.service';
import {
	Directive,
	AfterViewInit,
	HostListener,
	OnDestroy,
	HostBinding,
	ElementRef
} from '@angular/core';

@Directive({
	selector: '[mMenuHorizontalOffcanvas]'
})
export class MenuHorizontalOffcanvasDirective implements AfterViewInit, OnDestroy {
	menuOffcanvas: any;

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		// init the mOffcanvas plugin
		this.menuOffcanvas = new mOffcanvas(this.el.nativeElement, {
			overlay: true,
			baseClass: 'm-aside-header-menu-mobile',
			closeBy: 'm_aside_header_menu_mobile_close_btn',
			toggleBy: {
				target: 'm_aside_header_menu_mobile_toggle',
				state: 'm-brand__toggler--active'
			}
		});
	}

	ngOnDestroy(): void {}
}
