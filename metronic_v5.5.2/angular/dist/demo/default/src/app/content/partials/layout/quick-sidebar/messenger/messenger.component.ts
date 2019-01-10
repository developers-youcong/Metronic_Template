import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy
} from '@angular/core';
import { MessengerService } from '../../../../../core/services/messenger.service';
import { MessageData } from '../../../../../core/interfaces/message-data';
import { Observable } from 'rxjs';

@Component({
	selector: 'm-messenger',
	templateUrl: './messenger.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerComponent implements OnInit {
	@Input() messages: Observable<any>;

	constructor(public messengerService: MessengerService) {}

	ngOnInit(): void {
		this.messages = this.messengerService.getData();
	}
}
