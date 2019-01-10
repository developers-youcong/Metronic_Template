import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'm-recent-notifications',
  templateUrl: './recent-notifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
