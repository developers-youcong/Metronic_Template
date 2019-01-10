import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccordionControlModule } from '../../../partials/content/general/accordion-control/accordion-control.module';
import { MaterialPreviewModule } from '../../../partials/content/general/material-preview/material-preivew.module';
import { MetronicComponent } from './metronic.component';
import { AccordionComponent } from './accordion/accordion.component';
import { StickyFormActionsComponent } from './sticky-form-actions/sticky-form-actions.component';
import { FormsComponent } from './forms/forms.component';
import { CoreModule } from '../../../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../../partials/partials.module';

import {
	MatIconRegistry,
	MatIcon,
	MatInputModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatAutocompleteModule,
	MatSliderModule,
	MatListModule,
	MatCardModule,
	MatSelectModule,
	MatButtonModule,
	MatIconModule,
	MatNativeDateModule,
	MatSlideToggleModule,
	MatCheckboxModule,
	MatMenuModule,
	MatTabsModule,
	MatTooltipModule,
	MatSidenavModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSnackBarModule,
	MatGridListModule,
	MatTableModule,
	MatExpansionModule,
	MatToolbarModule,
	MatSortModule,
	MatDividerModule,
	MatStepperModule,
	MatChipsModule,
	MatPaginatorModule,
	MatDialogModule,
	MatRadioModule
} from '@angular/material';



const routes: Routes = [
	{
		path: '',
		component: MetronicComponent,
		children: [
			{
				path: 'accordion',
				component: AccordionComponent
			},
			{
				path: 'sticky-form-actions',
				component: StickyFormActionsComponent
			},
			{
				path: 'forms',
				component: FormsComponent
			}
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		AccordionControlModule.forRoot(),
		MaterialPreviewModule,
		PartialsModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		MatDialogModule,
		MatRadioModule
	],
	exports: [RouterModule],
	entryComponents: [
	],
	providers: [MatIconRegistry],
	declarations: [
		MetronicComponent,
		AccordionComponent,
		StickyFormActionsComponent,
		FormsComponent,
	]
})
export class MetronicModule { }
