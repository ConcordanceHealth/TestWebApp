import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KCap } from './kcap';
import { KCapService } from './kcap.service';

@Component({
  selector: 'my-kcaps',
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .kcaps {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 20em;
  }
  .kcaps li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .kcaps li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .kcaps li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .kcaps .text {
    position: relative;
    top: -3px;
  }
  .kcaps .usages {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`],
  template: `
    <h2>My Caps</h2>
    <ul class="kcaps">
      <li *ngFor="let kCap of kCaps"
        [class.selected]="kCap === selectedCap"
        (click)="onSelect(kCap)">
        <span class="usages">{{kCap.id | uppercase}}</span> {{kCap.name}}
      </li>
    </ul>
    <div *ngIf="selectedCap">
      <h2>
        You have selected {{selectedCap.id | uppercase}}
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
    <h3>{{stuffs}}</h3>
  `,
  providers: [KCapService]
})
export class KCapsComponent implements OnInit {

  kCaps: KCap[];
  selectedCap: KCap;
  stuffs: any;

  constructor(
    private router: Router,
    private kcapService: KCapService
  ) { }

  ngOnInit(): void {
    this.getKCaps();
    //this.getDrive();
  }
  /*
  getDrive(): void {
    this.kcapService.getDrive().then(stuffs => this.stuffs = stuffs);
  }
   */
  getKCaps(): void {
    this.kcapService.getKCaps().then(kcaps => this.kCaps = kcaps);
  }
  onSelect(kCap: KCap): void {
    this.selectedCap = kCap;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCap.id]);
  }
}