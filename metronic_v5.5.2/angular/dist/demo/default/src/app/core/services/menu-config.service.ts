import { Injectable } from '@angular/core';
import { ConfigData } from '../interfaces/config-data';
import { BehaviorSubject } from 'rxjs';
import { filter} from 'rxjs/operators';
import * as objectPath from 'object-path';
import { Router, NavigationStart } from '@angular/router';
import { MenuConfig } from '../../config/menu';

@Injectable()
export class MenuConfigService {
	public configModel: MenuConfig = new MenuConfig();
	public onMenuUpdated$: BehaviorSubject<MenuConfig> = new BehaviorSubject(
		this.configModel
	);
	menuHasChanged: any = false;

	constructor(private router: Router) {
		this.router.events
			.pipe(filter(event => event instanceof NavigationStart))
			.subscribe(event => {
				if (this.menuHasChanged) {
					this.resetModel();
				}
			});
	}

	setModel(menuModel: MenuConfig) {
		this.configModel = Object.assign(this.configModel, menuModel);
		this.onMenuUpdated$.next(this.configModel);
		this.menuHasChanged = true;
	}

	resetModel() {
		this.configModel = new MenuConfig();
		this.onMenuUpdated$.next(this.configModel);
		this.menuHasChanged = false;
	}
}
