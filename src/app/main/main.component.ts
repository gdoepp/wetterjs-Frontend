// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { WetterService } from '../wetter.service';
import { IStationListe } from '../IStationListe';
import { Jahr, Monat, Tag, Zeit } from '../Periode';
import { DataTransferService } from '../datatransfer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private wetter: WetterService, private router: Router,
        fromChild: DataTransferService) {

    this.time = '';

    this.subscribed = fromChild.fromChild.subscribe(data => {
      if (data.operation === 'time') {
        this.time = data.time;
        this.per = data.per;
      }
      if (data.operation === 'link') {
        this.goLink(data.link, data.value);
      }
      if (data.operation === 'goto') {
        if (!data.value || data.value === 'List') {
          this.goList(data.time, data.per);
        } else {
          if (data.time === 0) { data.time = this.time; }
          this.goDP(data.time, data.value, data.per);
        }
      }
    });
  }

  public stationListe: IStationListe = new IStationListe() ;
  public jahre: number[];
  public jahr: number;
  public stat: number;
  public statStr: string;
  public admin: number;
  public station: string;
  public time: string;
  public value: string;
  public tag: number;
  public monat: number;
  public per: string;
  protected perObj: Zeit;
  private subscribed: Subscription;
  public vals: string[];

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
     this.wetter.getStationen().subscribe( data  => {
        this.stationListe = data;
        this.statStr = data.stats[0].id;
        this.stat = Number.parseInt(this.statStr);
        this.station = data.stats[0].name;
        this.vals = data.stats[0].vals;
        this.admin = data.admin;
        this.jahr = new Date().getFullYear();
        this.tag = 1;
        this.monat = 1;
        this.time = this.jahr.toString();
        this.per = 'Monate';
        this.value = '-';
        this.updateJahre(this.stationListe);
     });
  }

  ngOnDestroy() {
    if (this.subscribed) { this.subscribed.unsubscribe(); }
  }

  updateJahre(data: IStationListe)  {
    const now = new Date();
    const aktjahr = now.getFullYear();
    let minjahr = aktjahr;
    for (let j = 0; j < data.rows.length; j++) {
      if (data.rows[j].stat === this.stat) {
        minjahr = data.rows[j].year;
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
    console.log('jahre: ' + jahre);
    if (!this.jahr || this.jahr < minjahr) {
      this.jahr = jahre[jahre.length - 1];
      this.time = this.time.replace(/[0-9]{4}/, this.jahr.toString());
    }
  }

  updateYear(ev) {
    console.log('update year: ' + this.jahr);
    this.time = this.time.replace(/[0-9]{4}/, this.jahr.toString());
    if (this.value === '-') {
      this.go('auswahl', {stat: this.stat, time: 0, per: 'Auswahl'});
    } else {
      this.go('.', {time: this.time, stat: this.stat, per: this.per, value: this.value});
    }
  }

  statChanged(ev) {
    this.stat = Number.parseInt(this.statStr);
    console.log('stat changed: ' + this.stat);
    for (const s in this.stationListe.stats) {
       if (Number.parseInt(this.stationListe.stats[s].id) === this.stat) {
         this.station = this.stationListe.stats[s].name;
         this.vals = this.stationListe.stats[s].vals;
         break;
       }
    }

    this.updateJahre(this.stationListe);
    if (this.value === '-') {
        this.go('auswahl', {stat: this.stat, time: 0, per: 'Auswahl'});
    } else {
      this.go('.', {time: this.time, stat: this.stat, per: this.per, value: this.value});
    }
  }

  checkTime (time: string)  {  // utility
    time = time.toString();
    if (time === '0') {
      const h = new Date();
      if (this.stat !== 0) {
        h.setDate(h.getDate() - 1);
      }
      time = h.getDate() + '.' + (h.getMonth() + 1) + '.' + (h.getFullYear());
    }

    return time;
  }

  goAuswahl(time) {
    this.go('/auswahl', {stat: this.stat, per: 'Auswahl', time: '0'});
    this.value = '';
  }

  goLink(link: string, value: string) {
    let path = 'listPeriode';
    if (value !== 'List') { path += 'D' + this.values[value].func; }
    this.go(path, {link: link, value: value });
  }

  goDP(time, value, per) {
    if (per === 'Tage' && this.value !== value) { per = 'Tag'; }
    this.value = value;
    time = this.checkTime(time);
    this.time = time;
    this.per = per;
    this.go('listPeriodeD' + this.values[value].func, {time: time, stat: this.stat,
      per: this.per, value: value, station: this.station });
  }

  goList(time, per) {
    time = this.checkTime(time);
    this.time = time;
    if (per === 'Tage') { per = 'Tag'; }
    this.per = per;
    this.value = '';
    this.go('listPeriode' , {time: time, stat: this.stat, per: per, value: 'List'});
  }

  go(path: string, args: object) {
    this.router.navigate([path, args]);
  }

  reload() {
    location.reload();
  }

  update() {
    this.go('update', {stat: this.stat, operation: 'update'});
    this.value = '-';
  }
  importHist() {
    this.go('update', {stat: this.stat, operation: 'importHist'});
    this.value = '-';
  }

}

