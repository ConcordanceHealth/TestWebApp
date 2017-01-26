import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { KCap } from './kcap';
import { KCapService } from './kcap.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'my-kcap-detail',
  templateUrl: 'app/kcap-detail.component.html',
  styleUrls: [ 'app/kcap-detail.component.css' ]
})
export class KCapDetailComponent implements OnInit {
  @Input() kCap: KCap;
  
  constructor(
    private kcapService: KCapService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.kcapService.getKCap(params['id']))
      .subscribe(kCap => this.kCap = kCap);
  }
  
  goBack(): void {
    this.location.back();
  }

  sendFill(): void {
    this.kcapService.sendFill(this.kCap)
      //.then(() => this.goBack());
  }
  sendUsage(): void {
    this.kcapService.sendFillUsage(this.kCap)[0]
      .then(() => this.goBack());
  }
}

