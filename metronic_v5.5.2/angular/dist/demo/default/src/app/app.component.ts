import {
	Component,
	HostBinding,
	Input,
	AfterViewInit,
	OnInit,
	ElementRef,
	ViewChild,
	ChangeDetectionStrategy,
} from '@angular/core';
import { LayoutConfigService } from './core/services/layout-config.service';
import { ClassInitService } from './core/services/class-init.service';
import { TranslationService } from './core/services/translation.service';
import * as objectPath from 'object-path';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { PageConfigService } from './core/services/page-config.service';
import { filter } from 'rxjs/operators';
import { SplashScreenService } from './core/services/splash-screen.service';
import { AclService } from './core/services/acl.service';

// language list
import { locale as enLang } from './config/i18n/en';
import { locale as chLang } from './config/i18n/ch';
import { locale as esLang } from './config/i18n/es';
import { locale as jpLang } from './config/i18n/jp';
import { locale as deLang } from './config/i18n/de';
import { locale as frLang } from './config/i18n/fr';

// LIST KNOWN ISSUES
// [Violation] Added non-passive event listener; https://github.com/angular/angular/issues/8866

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[m-root]',
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit {
	title = 'Metronic';

	@Input() attributes: any;

	@HostBinding('style') style: any;
	@HostBinding('class') classes: any = '';

	@ViewChild('splashScreen', { read: ElementRef })
	splashScreen: ElementRef;

	constructor(
		private layoutConfigService: LayoutConfigService,
		private classInitService: ClassInitService,
		private sanitizer: DomSanitizer,
		private translationService: TranslationService,
		private router: Router,
		private pageConfigService: PageConfigService,
		private splashScreenService: SplashScreenService,
		private aclService: AclService
	) {
		// subscribe to class update event
		this.classInitService.onClassesUpdated$.subscribe(classes => {
			// get body class array, join as string classes and pass to host binding class
			setTimeout(() => this.classes = classes.body.join(' '));
		});

		// subscribe to atrribute update event
		this.classInitService.onAttributeUpdated$.subscribe(attributes => {
			this.attributes = attributes.body;
			// TODO: print attribute to body
		});

		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
			this.classInitService.setConfig(model);

			this.style = '';
			if (objectPath.get(model.config, 'self.layout') === 'boxed') {
				const backgroundImage = objectPath.get(model.config, 'self.background');
				if (backgroundImage) {
					this.style = this.sanitizer.bypassSecurityTrustStyle('background-image: url(' + objectPath.get(model.config, 'self.background') + ')');
				}
			}
		});

		// register translations
		this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);

		// override config by router change from pages config
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.layoutConfigService.setModel({page: objectPath.get(this.pageConfigService.getCurrentPageConfig(), 'config')}, true);
			});
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		if (this.splashScreen) {
			this.splashScreenService.init(this.splashScreen.nativeElement);
		}
	}
}
