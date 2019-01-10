import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		RouterModule.forChild([
			{
				path: '',
				component: UserManagementComponent
			}
		])
	],
	providers: [],
	declarations: [UserManagementComponent]
})
export class UserManagementModule {}
