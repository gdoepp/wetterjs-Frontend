// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {IStationListe} from './IStationListe';
import {IWertListe} from './IWertListe';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable()
export class WetterService {

  private perName = {'Jahr': 'jahr', 'Monate': 'jahr', 'Monat': 'monat', 'Tag': 'tag', 'Tage': 'tag1' };

  constructor( private http: HttpClient) {   }

  public wetterUrl = environment.baseUrl;

  getStationen(): Observable<IStationListe> {
    return this.http.get<IStationListe>(this.wetterUrl + '/', httpOptions);
  }

  getListLink(link: string): Observable<IWertListe> {
    console.log('link->' + decodeURI(link));

    return this.http.get<IWertListe>(this.wetterUrl + decodeURIComponent(link), httpOptions);

  }


  post(path: string) {
    return this.http.post(this.wetterUrl + path, '');
  }
}
