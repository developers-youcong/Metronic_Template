import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { MessageData } from '../../../../../../core/interfaces/message-data';

@Component({
	selector: 'm-messenger-out',
	templateUrl: './messenger-out.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerOutComponent implements OnInit {
	@HostBinding('class') classes = 'm-messenger__wrapper';
	@Input() message: MessageData;

	constructor() {}

	ngOnInit(): void {}
}
