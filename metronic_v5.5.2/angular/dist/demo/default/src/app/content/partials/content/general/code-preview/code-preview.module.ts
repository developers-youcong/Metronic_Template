import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CodePreviewComponent } from './code-preview.component';
import { CodePreviewInnerComponent } from './code-preview-inner/code-preview-inner.component';

@NgModule({
	imports: [
		CommonModule,
		NgbModule
	],
	exports: [CodePreviewComponent, CodePreviewInnerComponent],
	declarations: [CodePreviewComponent, CodePreviewInnerComponent]
})
export class CodePreviewModule {}
