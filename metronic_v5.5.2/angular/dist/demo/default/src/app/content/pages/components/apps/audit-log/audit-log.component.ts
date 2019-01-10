import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-audit-log',
	templateUrl: './audit-log.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuditLogComponent {
	constructor() {}
}
