// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { WetterService } from '../wetter.service';
import { Zeit } from '../Periode';
import { DataTransferService } from '../datatransfer.service';
import { Subscription } from 'rxjs/Subscription';
import { isUndefined } from 'util';
import { IStationListe } from '../IStationListe';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private wetter: WetterService, private router: Router,
        private transfer: DataTransferService, private route: ActivatedRoute) {

    this.time = '';
  }

  public stationListe: IStationListe = new IStationListe() ;
  public jahre: number[];
  public jahr: number;
  public stat: string;
  public statStr: string;
  public admin: number;
  public station: string;
  public time: string;
  public value: string;
  public per: string;
  protected perObj: Zeit;
  private subscribed: Subscription;
  public vals: string[];
  public links: {};
  private rxParam: RegExp = new RegExp(/[{]{2}([A-Za-z0-9_]+)[}]{2}/);
  private ready = false;

  public values = {'temp': {name: 'Temperatur', func: 'T', id: 't', im: 'c'},
  'pres': {name: 'Luftdruck', func: 'P', id: 'p', im: 'c2'},
    'hum': {name: 'Luftfeuchte', func: 'H', id: 'h', im: 'c1'},
    'precip': {name: 'Niederschlag', func: 'R', id: 'i', im: 'rb'},
    'cloud': {name: 'Wolken', func: 'N', id: 'c', im: 'rg'},
    'lum': {name: 'Helligkeit', func: 'L', id: 'u', im: 'c3'},
    'sun': {name: 'Sonne', func: 'S', id: 's', im: 'ry'},
    'wind': {name: 'Wind', func: 'F', id: 'w', im: 'rv'}
  };


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      for (const p of params.keys) {
        console.log('main param: ' + p);
      }
    });

    this.wetter.getStationen().subscribe( data  => {
        this.stationListe = data;
        this.stat = data.stats[0].id;
        this.statStr = this.stat;
        this.station = data.stats[0].name;
        this.vals = data.stats[0].vals;
        this.admin = data.admin;
        console.log('got stats: ' + this.stat);
        this.jahr = new Date().getFullYear();
        this.time = this.jahr.toString();
        this.per = 'Jahr';
        this.value = '-';
        this.links = {};
        for (const link of data.links) {
          this.links[link.rel + 'Link'] = link.href;
        }

        this.updateJahre(this.stationListe);
        this.ready = true;  // only now we are really ready for normal service
        if (this.router.url.indexOf('aktuell') >= 0) { this.goAktuell(); }
     });

     this.subscribed = this.transfer.fromChild.subscribe(data => {
      if (data.operation === 'params') {
        if (!this.ready) {
          setTimeout( () => { this.transfer.sendToParent(data); }, 100);  // try later
          return;
        }
        if (isUndefined(data.time)) { return; }
        this.time = data.time;
        this.per = data.per;
        this.value = data.value;
        const needsUpdateStat =  (this.stat !== data.stat);
        this.stat = data.stat;
        this.statStr = this.stat;
        const jahr = Number.parseInt(this.time.substr(this.time.search(/[0-9]{4}/), 4));
        const needsUpdateJahr = (jahr !== this.jahr);
        this.jahr = jahr;
        console.log('got params from child ' + data.per + ', ' + data.value);
        if (needsUpdateStat) {
          this.statChanged(null);
        } else if (needsUpdateJahr) {
          this.updateYear(null);
        }
      }
      if (data.operation === 'link') {
        this.goLink(data.link, data.value);
      }
    });
    console.log('subscribed fromChild');

  }

  ngOnDestroy() {
    if (this.subscribed) { this.subscribed.unsubscribe(); console.log('unsubscribed fromChild'); }
  }

  updateJahre(data: IStationListe)  {
    const now = new Date();
    const aktjahr = now.getFullYear();
    let minjahr = aktjahr;
    for (let j = 0; j < data.rows.length; j++) {
      if (data.rows[j].stat === this.stat) {
        minjahr = data.rows[j].jahr;
        console.log('minjahr: ' + minjahr);      }
    }

    if (!this.jahre) {
      this.jahre = [];
    }
    const jahre = this.jahre;
    const njahre = aktjahr - minjahr + 1;
    while (njahre < jahre.length) { jahre.pop(); }

    for (let j = now.getFullYear() - jahre.length; j >= minjahr; j-- ) {
      jahre.push(j);
    }

    if (!this.jahr || this.jahr < minjahr) {
      this.jahr = jahre[jahre.length - 1];
      this.time = this.time.replace(/[0-9]{4}/, this.jahr.toString());
    }
  }

  updateYear(ev) {
    console.log('update year: ' + this.jahr);
    this.time = this.time.replace(/[0-9]{4}/, this.jahr.toString());
    if (this.value === '-') {
      this.goAktuell();
    } else {
      this.gotoValue(this.time, this.value, this.per);
    }
  }

  private pad (s, size) {
    while (s.length < (size || 2)) { s = '0' + s; }
    return s;
  }

  statChanged(ev) {
    this.stat = this.statStr;
    console.log('stat changed: ' + this.stat);
    for (const s in this.stationListe.stats) {
       if (this.stationListe.stats[s].id === this.stat) {
         this.station = this.stationListe.stats[s].name;
         this.vals = this.stationListe.stats[s].vals;
         let valFound = (this.value === 'List');
         if (!valFound) {
           for (const v of this.vals) {
             if (v === this.value) { valFound = true; break; }
           }
         }
         if (!valFound) { this.value = '-'; }
         break;
       }
    }

    this.updateJahre(this.stationListe);

    if (ev === null) { return; } // we are done, this is a synthetic event

    if (this.value === '-') {
        this.goAktuell();
    } else {
      this.gotoValue(this.time, this.value, this.per);
    }
  }

  private checkTime (time: string)  {  // utility
    time = time.toString();
    if (time === '0') {
      const h = new Date();
      if (this.stat !== '00000') {
        h.setDate(h.getDate() - 1);
      }
      time = h.getDate() + '.' + (h.getMonth() + 1) + '.' + (h.getFullYear());
    }

    return time;
  }

  private interpolate(arg) {  // replace parameters: {name}
    let match;
    while (match = arg.match(this.rxParam)) {
      arg = arg.replace(match[0], this[match[1]]);
    }
    return arg;
  }

  goAktuell() {
    const link = encodeURIComponent(this.interpolate(this.links['templateAktuellLink']));
    this.go('/aktuell', {link: link, value: '-' });
  }

  goLink(link: string, value: string) {
    let path = 'listPeriode';
    if (value !== 'List') { path += 'D' + this.values[value].func; }
    link = encodeURIComponent(this.interpolate(link));
    this.go(path, {link: link, value: value });
  }

  gotoValue(time, value, per) {
    if (per === 'Tage' && value !== this.value) { per = 'Tag'; }
    this.value = value;
    if (isUndefined(time)) { time = this.jahr; per = 'Jahr'; }
    time = this.checkTime(time);
    this.time = time;
    this.per = per;
    this.goLink(this.links['template' + per + 'Link'], this.value);
  }

  private go(path: string, args: object) {
    console.log('navigate to ' + path);
    this.router.navigate([path, args]);
  }

  reload() {
    location.reload();
  }

  update(link: string) {
    link = this.interpolate(link);
    this.go('update', {link: link});
    this.value = '-';
  }

}

