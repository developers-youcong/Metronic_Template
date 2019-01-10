import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
	selector: 'm-code-preview',
	templateUrl: './code-preview.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodePreviewComponent implements OnInit {
	@Input() title: any;

	@Input() htmlCode: any;
	@Input() tsCode: any;
	@Input() scssCode: any;

	constructor() {
	}

	ngOnInit() {}
}
