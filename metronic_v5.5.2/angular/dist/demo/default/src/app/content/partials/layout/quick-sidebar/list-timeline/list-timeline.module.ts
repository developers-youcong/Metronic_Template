import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTimelineComponent } from './list-timeline.component';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';
import { CoreModule } from '../../../../../core/core.module';

@NgModule({
	imports: [CommonModule, CoreModule],
	declarations: [ListTimelineComponent, TimelineItemComponent],
	exports: [ListTimelineComponent, TimelineItemComponent]
})
export class ListTimelineModule {}
