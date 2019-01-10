import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { HighlightModule } from 'ngx-highlightjs';
import { MaterialPreviewComponent } from './material-preview.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../../../../../core/core.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
	imports: [
		CommonModule,
		NgbModule,
		CoreModule,
		HighlightModule.forRoot({ theme: 'googlecode' }),
		PerfectScrollbarModule,

		// material modules
		MatTabsModule,
		MatExpansionModule,
		MatCardModule,
		MatIconModule
	],
	exports: [MaterialPreviewComponent],
	declarations: [MaterialPreviewComponent]
})
export class MaterialPreviewModule {}
