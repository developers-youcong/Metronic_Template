import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, filter, mergeMap } from 'rxjs/operators';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';
import { UtilsService } from './utils.service';
import { LayoutConfigStorageService } from './layout-config-storage.service';
import { LayoutConfig } from '../../config/layout';

@Injectable()
export class LayoutConfigService {
	public layoutConfig: LayoutConfig;

	public onLayoutConfigUpdated$: BehaviorSubject<LayoutConfig>;

	constructor(
		private router: Router,
		private utils: UtilsService,
		private layoutConfigStorageService: LayoutConfigStorageService
	) {
		// default config
		this.layoutConfig = new LayoutConfig();
		// register on config changed event and set default config
		this.onLayoutConfigUpdated$ = new BehaviorSubject(this.layoutConfig);

		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				mergeMap(() => this.layoutConfigStorageService.loadConfig())
			)
			.subscribe(config => {
				this.layoutConfig = config;
				this.onLayoutConfigUpdated$.next(config);
			});
	}

	/**
	 * Reset existing configurations
	 * NOTE: This method will remove older config and pass only new;
	 * @param model
	 * @param doNotSave
	 */
	setModel(model: any, doNotSave?: boolean): void {
		// merge and replace existing config object
		// deep merge for mutltidimentional arrays
		this.layoutConfig = Object.assign({}, this.layoutConfig, model);

		if (!doNotSave) {
			this.layoutConfigStorageService.saveConfig(this.layoutConfig);
		}

		// fire off an event that all subscribers will listen
		this.onLayoutConfigUpdated$.next(this.layoutConfig);
	}

	reloadSavedConfig(): void {
		this.setModel(new LayoutConfig(this.getSavedConfig()), true);
	}

	/**
	 * Set current config as default template.
	 * This config is changeable via layout builder.
	 * Useful when want to reset layout without clearing the config at layout
	 */
	getSavedConfig() {
		return this.layoutConfigStorageService.loadConfig();
	}
}
