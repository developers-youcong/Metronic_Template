import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerButtonComponent } from './spinner-button.component';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
	imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
	exports: [SpinnerButtonComponent],
	declarations: [SpinnerButtonComponent]
})
export class SpinnerButtonModule {}
