import { Injectable } from '@angular/core';
import {
	animate,
	AnimationBuilder,
	AnimationPlayer,
	style
} from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class SplashScreenService {
	private splashElement;
	public player: AnimationPlayer;

	constructor(
		private animationBuilder: AnimationBuilder,
		private router: Router
	) {}

	init(element) {
		// Get the splash screen element
		this.splashElement = element;
		// Hide it on the first NavigationEnd event
		const routerEvents = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.hide();
				routerEvents.unsubscribe();
			}
		});
	}

	show() {
		this.player = this.animationBuilder
			.build([
				style({ opacity: '0', zIndex: '99999' }),
				animate('600ms ease', style({ opacity: '1' }))
			])
			.create(this.splashElement);

		setTimeout(() => {
			this.player.play();
		}, 0);
	}

	hide() {
		this.player = this.animationBuilder
			.build([
				style({ opacity: '1' }),
				animate('600ms ease', style({ opacity: '0' }))
			])
			.create(this.splashElement);

		setTimeout(() => {
			this.player.onDone(
				() => (this.splashElement.style.display = 'none')
			);
			this.player.play();
		}, 0);
	}
}
