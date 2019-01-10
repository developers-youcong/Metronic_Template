import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs';
import * as objectPath from 'object-path';

@Component({
	selector: 'm-portlet',
	templateUrl: './portlet.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortletComponent implements OnInit, AfterViewInit {
	@Input() loading$: Observable<boolean>;
	@Input() options: any;

	@ViewChild('mPortlet') elPortlet: ElementRef;
	@ViewChild('mPortletHead') elHead: ElementRef;
	@ViewChild('mPortletBody') elBody: ElementRef;
	@ViewChild('mPortletFooter') elFooter: ElementRef;
	@ViewChild('mPortletHeadTools') elHeadTools: ElementRef;

	constructor(public loader: LoadingBarService) {
		this.loader.complete();
	}

	ngAfterViewInit(): void {
		// hide portlet footer if no content
		if (this.elFooter && this.elFooter.nativeElement.children.length == 0) {
			this.elFooter.nativeElement.style.display = 'none';
			this.elPortlet.nativeElement.classList.add('m-portlet--full-height');
		}
		// add portlet responsive mobile for sticky portlet
		if (objectPath.get(this.options, 'enableSticky')) {
			this.elPortlet.nativeElement.classList.add('m-portlet--responsive-mobile');
		}
		// hide portlet header tools if no content
		if (this.elHeadTools && this.elHeadTools.nativeElement.children.length == 0) {
			this.elHeadTools.nativeElement.style.display = 'none';
		}
	}

	ngOnInit() {}
}
