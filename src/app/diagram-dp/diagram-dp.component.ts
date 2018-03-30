// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WetterService } from '../wetter.service';
import { DiagramBase } from '../DiagramBase';
import { Tag } from '../Periode';
import { DataTransferService } from '../datatransfer.service';

@Component({
  selector: 'app-diagram-dp',
  templateUrl: './diagram-dp.component.html',
  styleUrls: ['./diagram-dp.component.css']
})
export class PeriodeDpComponent extends DiagramBase implements OnInit {

  constructor(route: ActivatedRoute, wetter: WetterService, toParent: DataTransferService) {
    super(route, wetter, toParent);
    this.data = {werte: {}};
  }

  ngOnInit() {
    this.init(0.5);
  }


  prepare() {

    super.prepare();

    const obj = this.data;
    const typ = this.perObj;
    const feld = this.value;

    const phenCols = {
        'hum_i': 'orange', 'hum_o': 'brown', 'pres': 'blue',
        'precip': 'blue', 'sun': 'yellow', 'cloud': 'gray', 'lum_o': 'goldenrod', 'lum_i': 'darkorange'
    };

    const phenWerte = {
        'hum': 'rel. Feuchte', 'hum_o': 'rel. Feuchte', 'hum_i': 'rel. Feuchte innen', 'pres': 'Luftdruck',
        'precip': 'Niederschlag', 'sun': 'Sonne', 'cloud': 'Wolken', 'lum': 'Helligkeit', 'lum_o': 'Helligkeit', 'lum_i': 'Helligkeit innen'
    };
    const units = {
        'hum': '%', 'hum_o': '%', 'hum_i': '%', 'pres': 'hPa',
        'precip': 'mm', 'sun': 'h', 'cloud': '/8', 'lum': '', 'lum_o': '', 'lum_i': ''
    };

    const data = obj.rows;
    obj.rows = undefined;

    const dims = { height: 870, width: 1600, x1: 90, minUnits: 1, mny: undefined, mxy: undefined,
        mxyLimit: undefined, mnyLimit: undefined, scalefn: undefined, scalefninv: undefined };

    obj.cols = phenCols;
    obj.werte = phenWerte;

    this.data.unit = units[feld];
    if (typ instanceof Tag && feld === 'sun') { this.data.unit = 'min'; }

    const values = [];

    if (feld === 'precip') { dims.mny = 0; dims.mxy = 5; }
    if (feld === 'sun') { dims.mny = 0; dims.minUnits = ( this.per === 'Tag'  ? 60 : 5); }
    if (feld === 'cloud') { dims.mny = 0; dims.mxy = 8; }
    if (feld === 'hum') {
        dims.minUnits = 30;
        dims.mxyLimit = 100;
        dims.mnyLimit = 0;
        values.push('hum_o');
        if (data.length > 0 && data[data.length - 1]['hum_i']) { values.push('hum_i'); }
    }
    if (feld === 'lum') {
        dims.minUnits = 3;
        values.push('lum_o');
        dims.scalefn = function (x) { return x > 1e-2 ? Math.log(x) / Math.log(10) : -2; }; // min: half moon
        dims.scalefninv = function (x) {
            return x === -2 ? '0' : Math.round(Math.pow(10, x) * Math.pow(10, Math.ceil(-x) + 2)) / Math.pow(10, Math.ceil(-x) + 2);
        };
        if (data.length > 0 && data[data.length - 1]['lum_i']) { values.push('lum_i'); }
    }
    if (feld === 'pres') { dims.minUnits = 10; }

    if (values.length === 0) { values.push(feld); }

    this.makeRange(dims, data, values, typ);

    if (feld === 'precip' || feld === 'cloud' || feld === 'sun') {
        this.makeRects(obj, data, dims, typ, values);
    } else {
        this.makeCurves(obj, data, dims, typ, values);
    }
    obj.values = values;
    this.makeAxes(obj, data, dims, typ);
  }

}
