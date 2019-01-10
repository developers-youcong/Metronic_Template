import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-list-settings',
	templateUrl: './list-settings.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSettingsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
