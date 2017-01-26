import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoogleDrive provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleDriveProvider {
  data: any = null;
  
  returnArray: Array<any>;

  constructor(public http: Http) {}

  load( sheetId ) {
    /*
    if (this.returnArray) {
      // already loaded data
      return Promise.resolve(this.returnArray);
    }
    */

    var url = "https://spreadsheets.google.com/feeds/list/1ch2evfNL9aT5fb9LdkMUfjrK7hfsxqpe0cF47CgwYBY/" + sheetId + "/public/values?alt=json";

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url)
        .map(res => res.json() )
        .subscribe( data => {
          console.log( 'Raw Data', data );
          this.data = data.feed.entry;
          
          this.returnArray = [];
          if( this.data && this.data.length > 0 ) {
            this.data.forEach( ( entry, index ) => {
              var obj = {};
              for( let x in entry ) {
                if( x.includes('gsx$') && entry[x].$t ){
                  obj[x.split('$')[1]] = entry[x]['$t'];
                  //console.log( x.split('$')[1] + ': ' + entry[x]['$t'] );
                }
              }
              this.returnArray.push( obj );
            });
          }
          resolve(this.returnArray);
        });
    });
  }
}