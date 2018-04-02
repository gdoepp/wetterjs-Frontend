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
    public parent: string;

    constructor(protected route: ActivatedRoute, protected wetter: WetterService, protected toParent: DataTransferService) {
        this.data = {};
    }

    prepare() {
    }

    init(offset: number = 0) {

        this.route.paramMap.subscribe(params => {
          const link = params.get('link');
          this.value = params.get('value');
          if (link) {
              console.log('update link: ' + link);
              this.updateLink(link);
            }
        });
    }

    updateLink(link) {
        this.wetter.getListLink(link).subscribe( this.processData.bind(this));
    }

    processData(data) {
        console.log('got data');
        this.data = {};
        if (data.rows) {
            this.data.rows = data.rows;
        } else {
            this.data.rows = data;
        }
        this.per = data.type;
        this.time = data.time;
        this.stat = data.stat;

        let perObj: Zeit;
        console.log('send params: ' + this.time + ' ' + this.value);
        this.toParent.sendToParent({operation: 'params', time: this.time, per: this.per, value: this.value, stat: this.stat});
        switch (this.per) {
        case 'Monate':
        case 'Jahr':
        perObj = new Jahr(Number.parseInt(this.time));
        this.index_id = 'monat'; this.index_name = 'monat'; this.name = 'Monat'; this.parent = undefined;
        break;
        case 'Monat':
        perObj = new Monat(this.time);
        this.index_id = 'time_d'; this.index_name = 'tag'; this.name = 'Tag'; this.parent = 'Jahr';
        break;
        case 'Tag':
        perObj = new Tag(this.time, this.offset);
        this.index_id = 'time_t'; this.index_name = 'time_t'; this.name = 'Zeit'; this.parent = 'Monat';
        break;
        case 'Tage': perObj = new Tage(this.time, this.offset);
        this.index_id = 'time_t'; this.index_name = 'time_t'; this.name = 'Zeit'; this.parent = 'Monat';
        break;
        default: // console.log('error: periode not known - ' + per);
        }

        if (perObj) {
            this.data.vorher = perObj.vorher;
            this.data.nachher = perObj.nachher;
            if (perObj instanceof Tag) { this.data.heute = (perObj as Tag).heute; }
            this.data.super = perObj.super;
            this.perObj = perObj;
        }
        if (data.links) {
            for (const link of data.links) {
                this.data[link.rel + 'link'] = link.href;
            }
        }
        if (this.data.rows.length > 0) { this.prepare(); }
    }

    link(lnk: string) {
        console.log('send link: ' + lnk);
        this.toParent.sendToParent({operation: 'link', link: lnk, value: this.value});
    }

}
