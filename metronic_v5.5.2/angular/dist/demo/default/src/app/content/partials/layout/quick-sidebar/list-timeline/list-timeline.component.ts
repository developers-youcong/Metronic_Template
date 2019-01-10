import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy
} from '@angular/core';
import { LogsService } from '../../../../../core/services/logs.service';
import { LogData } from '../../../../../core/interfaces/log-data';
import { Observable } from 'rxjs';

@Component({
	selector: 'm-list-timeline',
	templateUrl: './list-timeline.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTimelineComponent implements OnInit {
	@Input() type: any;
	@Input() heading: any;

	@Input() logList: Observable<LogData[]>;

	constructor(private logsService: LogsService) {}

	ngOnInit() {
		this.logList = this.logsService.getData({ types: this.type });
	}
}
