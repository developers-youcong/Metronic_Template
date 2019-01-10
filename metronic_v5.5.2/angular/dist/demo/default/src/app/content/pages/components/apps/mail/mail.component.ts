import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'm-mail',
	templateUrl: './mail.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
