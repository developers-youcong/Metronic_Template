import {
	Directive,
	AfterViewInit,
	OnDestroy,
	ElementRef,
	HostListener,
	Output
} from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
	selector: '[mQuickSearch]'
})
export class QuickSearchDirective implements AfterViewInit, OnDestroy {
	quicksearch: any;

	public onSearch$: Subject<any> = new Subject<any>();

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		const mode = this.el.nativeElement.getAttribute('m-quicksearch-mode');
		// init mQuicksearch plugin
		this.quicksearch = new mQuicksearch(this.el.nativeElement, {
			mode: mode, // quick search type
			minLength: 1
		});

		this.quicksearch.on('search', plugin => {
			this.onSearch$.next(plugin);
		});
	}

	ngOnDestroy(): void {}
}
