import {
	Directive,
	Renderer2,
	ElementRef,
	AfterViewInit,
	OnDestroy
} from '@angular/core';

@Directive({
	selector: '[mTabLine]'
})
export class TabLineDirective implements AfterViewInit, OnDestroy {
	constructor(private renderer: Renderer2, private el: ElementRef) {
		console.log(this.el.nativeElement);
		console.log(this.el.nativeElement.getElementsByTagName('li'));
	}

	ngOnDestroy(): void {}

	ngAfterViewInit(): void {
		console.log(this.el.nativeElement);
		console.log(this.el.nativeElement.getElementsByTagName('li'));
	}
}
