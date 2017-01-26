import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { KCap } from './kcap';
//import { DUMMYCAPS } from './mock-kcaps';
import { GoogleDriveProvider } from './google-drive';

@Injectable()
export class KCapService {
  
  private testRows;

  constructor(
    private http: Http,
    private gDrive: GoogleDriveProvider
  ) { }
  
 
  // Let's not do this every time?
  getKCaps(): Promise<KCap[]> {
    return new Promise(resolve => {
    this.gDrive.load("osuq0p7")
      .then( data => {
        let returnArray: Array<KCap> = [];
        this.testRows = data;
        if (this.testRows && this.testRows.length > 0 ) {
          this.testRows.forEach( entry => {
              let kcap = new KCap(entry);
              returnArray.push(kcap);
              //console.log(JSON.stringify(kcap));
            }
          )
        }
        resolve(returnArray);
      });
    });
  }

  sendFill(kCap: KCap): Promise<KCap> {
    console.log(JSON.stringify(kCap.capFill));
    var headers = new Headers({'Content-Type': 'application/json', 'X-Mars-Node-Id': kCap.capFill.fill.baseStation.uniqueId});
    const url = 'https://dev.smartmedreminder.com:8443/smartx-0.0.1-SNAPSHOT/rest/fill/by-cap';
    return this.http.post(url, JSON.stringify(kCap.capFill), {headers: headers})
      .toPromise()
      .then(() => kCap)
      .catch(this.handleError);
  }

  sendFillUsage(kCap: KCap): Promise<KCap>[] {
    //console.log(kCap.getCapUsageJSON());
    var headers = new Headers({'Content-Type': 'application/json', 'X-Mars-Node-Id': kCap.capFill.fill.baseStation.uniqueId});
    const url = 'https://dev.smartmedreminder.com:8443/smartx-0.0.1-SNAPSHOT/rest/fill-usage/by-cap';
    var stuffs: Promise<KCap>[] = [];
    var packet: string[] = kCap.getCapUsageJSON();
    packet.forEach(item => {
      console.log(item);
      stuffs.push( this.http.post(url, item, {headers: headers})
        .toPromise()
        .then(() => kCap)
        .catch(this.handleError));
    });
    return stuffs;
  }
  
  getKCap(id: string): Promise<KCap> {
    return this.getKCaps().then(kcaps => kcaps.find(kcap => kcap.id === id));
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

