import {
	Directive,
	AfterViewInit,
	HostListener,
	OnDestroy,
	HostBinding,
	ElementRef
} from '@angular/core';

@Directive({
	selector: '[mMenuAsideOffcanvas]'
})
export class MenuAsideOffcanvasDirective implements AfterViewInit, OnDestroy {
	menuOffcanvas: any;

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		// check class for the offcanvas option
		// tslint:disable-next-line:max-line-length
		const offcanvasClass = mUtil.hasClass(this.el.nativeElement, 'm-aside-left--offcanvas-default') ? 'm-aside-left--offcanvas-default' : 'm-aside-left';

		// init the mOffcanvas plugin
		this.menuOffcanvas = new mOffcanvas(this.el.nativeElement, {
			baseClass: offcanvasClass,
			overlay: true,
			closeBy: 'm_aside_left_close_btn',
			toggleBy: {
				target: 'm_aside_left_offcanvas_toggle',
				state: 'm-brand__toggler--active'
			}
		});
	}

	ngOnDestroy(): void {}
}
