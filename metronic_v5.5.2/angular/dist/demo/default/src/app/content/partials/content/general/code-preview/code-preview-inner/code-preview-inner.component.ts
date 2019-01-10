import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
	selector: 'm-code-preview-inner',
	templateUrl: './code-preview-inner.component.html'
})
export class CodePreviewInnerComponent implements OnInit {
	@Input() title: any;
	@Input() htmlCode: any;
	@Input() tsCode: any;
	@Input() scssCode: any;

	constructor(private sanitizer: DomSanitizer) {
	}

	ngOnInit() { }
}
