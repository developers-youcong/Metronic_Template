import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'm-packages',
  templateUrl: './packages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
