import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-user-management',
	templateUrl: './user-management.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {
	constructor() { }
}
