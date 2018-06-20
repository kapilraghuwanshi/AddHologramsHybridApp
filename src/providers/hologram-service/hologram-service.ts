import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Hologram } from '../../components/holograms/holograms';

@Injectable()
export class HologramServiceProvider {

  private holoUrl: string = "https://powerbonus.in/api/Holograms";

  constructor(public http: Http) {
    console.log('Hello HologramServiceProvider Provider');
  }

  //Add holograms details to server
  addNewHologram(holo: Hologram): Observable<Hologram> {
    let headers = new Headers({ 'content-type': 'application/json' });
    let httpOptions = new RequestOptions({ headers: headers });
    return this.http.post(this.holoUrl, holo, httpOptions)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  //to map json response into javascript object
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  //to handle error in Rresponse
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
