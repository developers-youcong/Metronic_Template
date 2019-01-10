import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogComponent } from './audit-log.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: AuditLogComponent
			}
		])
	],
	declarations: [AuditLogComponent]
})
export class AuditLogModule {}
