import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { HeaderService } from '../../../core/services/layout/header.service';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LayoutRefService } from '../../../core/services/layout/layout-ref.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
	selector: 'm-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {

	constructor(
		private el: ElementRef,
		private router: Router,
		private layoutRefService: LayoutRefService,
		public headerService: HeaderService,
		public loader: LoadingBarService
	) {
		// page progress bar percentage
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				// set page progress bar loading to start on NavigationStart event router
				this.loader.start();
			}
			if (event instanceof RouteConfigLoadStart) {
				this.loader.increment(35);
			}
			if (event instanceof RouteConfigLoadEnd) {
				this.loader.increment(75);
			}
			if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
				// set page progress bar loading to end on NavigationEnd event router
				this.loader.complete();
			}
		});
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		// keep header element in the service
		this.layoutRefService.addElement('header', this.el.nativeElement);
	}
}
