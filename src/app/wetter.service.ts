import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {IStationListe} from './IStationListe';
import {IWertListe} from './IWertListe';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable()
export class WetterService {

  private perName = {'Monate': 'jahr', 'Monat': 'monat', 'Tag': 'tag' };

  constructor( private http: HttpClient) {   }

  private wetterUrl = 'http://gdlinux-cls-vpn:1337/wetter/';

  getStationen(): Observable<IStationListe> {
    return this.http.get<IStationListe>(this.wetterUrl + 'stats', httpOptions);
  }

  getAuswahl(stat: string): Observable<IWertListe> {
    console.log('wetter.auswahl: ' + stat);
    return this.http.get<IWertListe>(this.wetterUrl + 'Auswahl?stat=' + stat, httpOptions);
  }

  getListPeriode(time: string, per: string, stat: string): Observable<IWertListe> {
    console.log('list' + per + ', Per: ' + time + ', stat: ' + stat);
    return this.http.get<IWertListe>(this.wetterUrl + 'list' + per +
    '?' + this.perName[per] + '=' + time + '&stat=' + stat, httpOptions);
  }

  getListMonate(jahr: string, stat: string): Observable<IWertListe> {
    console.log('listMonate, jahr: ' + jahr + ', stat: ' + stat);
    return this.http.get<IWertListe>(this.wetterUrl + 'listMonate?jahr=' + jahr + '&stat=' + stat, httpOptions);
  }

  getListMonat(monjahr: string, stat: string): Observable<IWertListe> {
    console.log('listMonat, : ' + monjahr + ', stat: ' + stat);
    return this.http.get<IWertListe>(this.wetterUrl + 'listMonat?monat=' + monjahr + '&stat=' + stat, httpOptions);
  }

}