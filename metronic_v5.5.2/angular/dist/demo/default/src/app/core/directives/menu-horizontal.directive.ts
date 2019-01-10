import {
	Directive,
	AfterViewInit,
	HostListener,
	OnDestroy,
	HostBinding,
	ElementRef
} from '@angular/core';

@Directive({
	selector: '[mMenuHorizontal]'
})
export class MenuHorizontalDirective implements AfterViewInit, OnDestroy {
	menu: any;

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		// init the mMenu plugin
		this.menu = new mMenu(this.el.nativeElement, {
			submenu: {
				desktop: 'dropdown',
				tablet: 'accordion',
				mobile: 'accordion'
			},
			accordion: {
				slideSpeed: 200, // accordion toggle slide speed in milliseconds
				autoScroll: true, // enable auto scrolling(focus) to the clicked menu item
				expandAll: false // allow having multiple expanded accordions in the menu
			}
		});
	}

	ngOnDestroy(): void {}
}
