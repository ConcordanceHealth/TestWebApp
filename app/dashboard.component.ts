import { Component, OnInit } from '@angular/core';

import { KCap } from './kcap';
import { KCapService } from './kcap.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  kcaps: KCap[] = [];
  
  constructor(private kcapService: KCapService) { }
  
  ngOnInit(): void {
    this.kcapService.getKCaps().then(kcaps => {
      this.kcaps = kcaps.sort((kcap1: KCap, kcap2: KCap) => {
        if (kcap1.rssi > kcap2.rssi) {
          return 1;
        }
        if (kcap1.rssi < kcap2.rssi) {
          return -1;
        }
        return 0;
      }).slice(0,4);
    });
  }
  
  getSorted(): KCap[] {
    return this.kcaps.sort((kcap1: KCap, kcap2: KCap) => {
      if (kcap1.rssi > kcap2.rssi) {
        return 1;
      }
      if (kcap1.rssi < kcap2.rssi) {
        return -11;
      }
    return 0;
    });
  }
}