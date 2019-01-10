import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
	selector: '[mMenuAsideToggle]'
})
export class MenuAsideToggleDirective implements AfterViewInit, OnDestroy {
	toggle: any;
	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		this.toggle = new mToggle(this.el.nativeElement, {
			target: 'body',
			targetState: 'm-brand--minimize m-aside-left--minimize',
			togglerState: 'm-brand__toggler--active'
		});

		this.el.nativeElement.addEventListener('toggle', e => {
			console.log(e);
		});
	}

	ngOnDestroy(): void { }
}
