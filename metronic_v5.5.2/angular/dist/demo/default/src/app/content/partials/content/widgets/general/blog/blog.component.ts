import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'm-blog',
  templateUrl: './blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
