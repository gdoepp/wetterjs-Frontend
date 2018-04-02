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
    return this.http.get<IStationListe>(this.wetterUrl + '/stats', httpOptions);
  }

  getAktuell(stat: string): Observable<IWertListe> {
    console.log('wetter.aktuell: ' + stat);
    return this.http.get<IWertListe>(this.wetterUrl + '/aktuell?stat=' + stat, httpOptions);
  }
  formatDate(tag: Date) {
    return tag.getDate() + '.' + (tag.getMonth() + 1) +  '.' + (tag.getFullYear());
  }
  toDay(tag) {
    if (tag && tag !== 'undefined' && tag !== 0) {
      let tg = tag.split('.');
      if (tg.length !== 3) {
        tg = tag.split('-'); tag = new Date(tg[0], tg[1] - 1, tg[2]);
      } else {
        tag = new Date(tg[2], tg[1] - 1, tg[0]);
      }
    } else {
      tag = new Date();
    }
    return tag;
  }

  getListLink(link: string): Observable<IWertListe> {
    console.log('link->' + link);

    return this.http.get<IWertListe>(this.wetterUrl + link, httpOptions);

  }

  getListPeriode(time: string, per: string, stat: number): Observable<IWertListe> {
    console.log('list' + per + ', Per: ' + time + ', stat: ' + stat);

    let params = '';

    if (per === 'Tage') {
      per = 'Tag';
      const tag1 = this.toDay(time);
      tag1.setDate(tag1.getDate() - 1);
      const tag2 = this.toDay(time);
      tag2.setDate(tag2.getDate() + 1);
      params = 'tag1=' + this.formatDate(tag1) + '&tag2=' + this.formatDate(tag2);
    } else {
      if (this.perName[per]) { params = this.perName[per] + '=' + time; }
    }

    if (per === 'aktuell') { per = 'aktuell'; } else { per = 'list' + per; }

    return this.http.get<IWertListe>(this.wetterUrl + '/' + per +
    '?' + params + '&stat=' + stat, httpOptions);

  }

  post(path: string) {
    return this.http.post(this.wetterUrl + path, '');
  }
}
