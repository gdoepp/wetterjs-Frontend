//  (c) Gerhard Döppert, 2017, GNU GPL 3
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { WetterService } from './wetter.service';
import { Jahr, Monat, Tag, Tage, Zeit } from './Periode';
import { DataTransferService } from './datatransfer.service';

export class WetterViewBase {

    public per: string;
    public value: string;
    public data;
    protected perObj: Zeit;
    protected offset: number;
    protected stat: number;
    protected time: string;
    public index_id: string;
    public index_name: string;
    public name: string;

    constructor(protected route: ActivatedRoute, protected wetter: WetterService, protected toParent: DataTransferService) {
        this.data = {};
    }

    prepare() {}

    init(offset: number = 0) {
        console.log('parent: ' + this.route.parent.component.valueOf());
        this.route.paramMap.subscribe(params => {
          const time = params.get('time');
          this.stat = Number.parseInt(params.get('stat'));
          const per = params.get('per');
          this.value = params.get('value');
          this.offset = offset;
          this.update(time, per);

        });
    }

    update(time, per) {
        this.per = per;
        if (time === 0) { time = this.time; } else { this.time = time; }
        this.wetter.getListPeriode(time, per, this.stat).subscribe( data  => {
            console.log('preparing list');
            this.data = {};
            if (data.rows) {
                this.data.rows = data.rows;
            } else {
                this.data.rows = data;
            }
            let perObj: Zeit;
            switch (per) {
            case 'Monate':
            perObj = new Jahr(Number.parseInt(time));
            this.index_id = 'monat'; this.index_name = 'monat'; this.name = 'Monat';
            break;
            case 'Monat':
            perObj = new Monat(time);
            this.index_id = 'time_d'; this.index_name = 'tag'; this.name = 'Tag';
            break;
            case 'Tag':
            perObj = new Tag(time, this.offset);
            this.index_id = 'time_t'; this.index_name = 'time_t'; this.name = 'Zeit';
            break;
            case 'Tage': perObj = new Tage(time, this.offset); break;
            default: // console.log('error: periode not known - ' + per);
            }

            if (perObj) {
                this.data.vorher = perObj.vorher;
                this.data.nachher = perObj.nachher;
                if (perObj instanceof Tag) { this.data.heute = (perObj as Tag).heute; }
                this.data.super = perObj.super;
                this.perObj = perObj;
            }
            this.prepare();
        });
    }

    goto(t: string, dir: string) {
        console.log('emitting event goto... ' + t + ' ' + dir);
        let per = this.per;
        if (dir === 'up') {
          if (this.per === 'Monat') { per = 'Monate'; }
          if (this.per === 'Tag' || this.per === 'Tage') { per = 'Monat'; }
        }
        if (dir === 'down') {
          if (this.per === 'Monate') { per = 'Monat'; }
          if (this.per === 'Monat') { per = 'Tag'; }
        }
        if (dir === '3Tage') {
            per = 'Tage';
        }
        if (dir === '1Tag') {
            per = 'Tag';
        }

        this.toParent.sendToParent({time: t, value: this.value, per: per});

      }

}