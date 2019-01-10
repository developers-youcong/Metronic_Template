import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ExternalCodeExample } from '../../../../core/models/external-code-example';

@Component({
	selector: 'm-ngbootstrap',
	templateUrl: './ngbootstrap.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbootstrapComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}
}
