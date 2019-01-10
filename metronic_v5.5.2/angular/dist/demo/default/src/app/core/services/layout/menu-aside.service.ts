import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuConfigService } from '../menu-config.service';
import { ClassInitService } from '../class-init.service';
import * as objectPath from 'object-path';

@Injectable()
export class MenuAsideService {
	classes: string;
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject([]);

	constructor(
		private menuConfigService: MenuConfigService,
		private classInitService: ClassInitService
	) {
		// get menu list
		this.menuConfigService.onMenuUpdated$.subscribe(model => {
			setTimeout(() =>
				this.menuList$.next(objectPath.get(model.config, 'aside.items'))
			);
		});
	}
}
