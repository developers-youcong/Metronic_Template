import { Component, OnInit, Input, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { ExternalCodeExample } from '../../../../../core/models/external-code-example';
import { NoticeComponent } from '../notice/notice.component';


@Component({
	selector: 'm-material-preview',
	templateUrl: './material-preview.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialPreviewComponent implements OnInit {

	@Input() viewItem: any;
	constructor() { }

	ngOnInit() {
	}

	changeCodeVisibility(): void {
		this.viewItem.isCodeVisible = !this.viewItem.isCodeVisible;
	}

	hasExampleSource(): boolean {
		if (!this.viewItem) {
			return  false;
		}

		if (!this.viewItem.cssCode && !this.viewItem.htmlCode && !this.viewItem.scssCode && !this.viewItem.tsCode) {
			return  false;
		}

		return  true;
	}
}
