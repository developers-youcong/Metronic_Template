import {
	Directive,
	AfterViewInit,
	HostListener,
	OnDestroy,
	ElementRef
} from '@angular/core';

@Directive({
	selector: '[mScrollTop]'
})
export class ScrollTopDirective implements AfterViewInit, OnDestroy {
	scrollTop: any;

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		// init mScrollTop plugin
		this.scrollTop = new mScrollTop(this.el.nativeElement, {
			offset: 300,
			speed: 600
		});
	}

	ngOnDestroy(): void {}
}
