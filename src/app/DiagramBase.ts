//  (c) Gerhard Döppert, 2017, GNU GPL 3
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { WetterService } from './wetter.service';
import { IWertListe } from './IWertListe';
import { Jahr, Monat, Tag, Tage, Zeit } from './Periode';
import { WetterViewBase } from './WetterViewBase';
import { DataTransferService } from './datatransfer.service';

export class DiagramBase extends WetterViewBase {

    public per: string;
    public value: string;
    public data;
    protected perObj: Zeit;
    protected offset: number;
    protected time: string;

    constructor(route: ActivatedRoute, wetter: WetterService, toParent: DataTransferService) {
        super(route, wetter, toParent);
        this.data = {};
    }

    makeRange(dims, data, values, typ) {

        let center = false;

        if (dims.mny === undefined) { dims.mny = 9999999; center = true; }
        if (dims.mxy === undefined) { dims.mxy = -9999999; }
        if (!dims.scalefn) { dims.scalefn = function (x) { return x; }; }
        if (!dims.scalefninv) { dims.scalefninv = dims.scalefn; }

        for (let k = 0; k < data.length; k++) {

            const tv = data[k];

            for (const v in values) {
                if (tv[values[v]]) {
                    dims.mny = Math.min(dims.mny, tv[values[v]]);
                    dims.mxy = Math.max(dims.mxy, tv[values[v]]);
                }
            }
        }

        if (dims.minUnits && dims.mxy > dims.mny && dims.mxy - dims.mny < dims.minUnits) {
            if (center) {
                const rest = dims.minUnits - (dims.mxy - dims.mny);
                dims.mny = dims.mny - rest / 2;
                dims.mxy = dims.mxy + rest / 2;
            } else {
                dims.mxy = dims.mny + dims.minUnits;
            }
            if (dims.mxyLimit && dims.mxy > dims.mxyLimit) { dims.mxy = dims.mxyLimit; }
            if (dims.mnyLimit && dims.mny < dims.mnyLimit) { dims.mny = dims.mnyLimit; }
        }

        dims.dmy = dims.height * 0.99 / (dims.scalefn(dims.mxy) - dims.scalefn(dims.mny));
        dims.dx = (dims.width * 0.99 - 1.5 * dims.x1) / (typ.indexn - typ.index0);
    }

    makeCurves(obj, data, dims, typ, values) {

        for (const v of values) {
            obj[v] = '';
        }
        for (let k = 0; k < Math.max(2, data.length); k++) {
            const tv = (k < data.length ? data[k] : data[k - 1]);
            const j = typ.index(tv, (data.length > 1 ? 0.5 : k));
            for (const v of values) {
                if (tv[v]) {
                    obj[v] += ' ' + Math.round(dims.x1 + j * dims.dx) + ' ' +
                        Math.round(dims.height - (dims.scalefn(tv[v]) - dims.scalefn(dims.mny)) * dims.dmy);
                }
            }
        }
    }

    makeRects(obj, data, dims, typ, values) {

        for (const v of values) {
            obj[v] = [];
        }
        if (data.length > 1) {
            obj.xwidth = 0.9 * dims.dx * (typ.index(data[1]) - typ.index(data[0]));
        } else {
            obj.xwidth = 0.9 * dims.dx * (typ.index(data[0], 1) - typ.index(data[0], 0));
        }
        for (let k = 0; k < data.length; k++) {
            const tv = data[k];
            const j = typ.index(tv);
            for (const v of values) {
                if (tv[v]) {
                    obj[v].push({
                        x: Math.round(dims.x1 + j * dims.dx + obj.xwidth * 0.07),
                        y: Math.round(dims.height - (dims.scalefn(tv[v]) - dims.scalefn(dims.mny)) * dims.dmy)
                    });
                }
            }
        }
    }

    makeAxes(obj, data, dims, typ) {
        obj.tickYx = dims.x1 - 5;
        obj.tickYy = [];
        obj.tickYTag = [];

        obj.gridYPath = [];
        obj.gridYStroke = [];

        let step = 1;
        const mxy = dims.scalefn(dims.mxy);
        const mny = dims.scalefn(dims.mny);

        const stepl = Math.log(mxy - mny) / Math.log(10);
        let step10 = Math.floor(stepl);
        const step_10 = stepl - step10;
        if (step_10 > 0.69897) {
            step = 5 * Math.pow(10, step10 - 1);
        } else {
         if (step_10 > 0.176) {
             step = 2 * Math.pow(10, step10 - 1);
            } else {
              step = Math.pow(10, step10 - 1);
            }
        }
        step10 = Math.pow(10, step10 - 1);

        let ybeg = Math.floor(mny);
        ybeg += (step - ybeg % step) % step;
        while (ybeg < mny) { ybeg += step; }

        const mbeg = typ.tick();

        for (let y0 = ybeg; y0 <= mxy; y0 += step) {
            const y = y0 - mny;
            obj.gridYPath.push(dims.x1 + ' ' + Math.round(dims.height - y * dims.dmy) + ' ' +
                (dims.x1 + mbeg[mbeg.length - 1] * dims.dx) +
                ' ' + Math.round(dims.height - y * dims.dmy));
            obj.gridYStroke.push(y0 === 0 ? 3 : 1);

            obj.tickYy.push((dims.height - y * dims.dmy));
            obj.tickYTag.push(dims.scalefninv(y0));
        }

        obj.tickXx = [];
        obj.tickXy = dims.height + 20;
        obj.tickXTag = typ.xaxis;

        obj.gridXPath = [];
        obj.link = [];
        obj.x = [];

        if (data.length > 0 && (data[0].time_d || data[0].monat)) {
            obj.tickXwidth = (mbeg[1] - mbeg[0]) * dims.dx - 7;
            obj.tickXheight = 20;
            for (let j = 0; j < data.length; j++) {
                if (data[j].time_d) {
                    obj.link.push(data[j].time_d);
                } else {
                    obj.link.push(data[j].monat);
                }
                obj.x.push(Math.round(dims.x1 + typ.index(data[j]) * dims.dx));
            }
        } else {
            obj.tickXwidth = 0;
            obj.tickXheight = 0;
        }

        for (let j = 0; j < mbeg.length; j++) {
            obj.gridXPath.push(Math.round(dims.x1 + (mbeg[j] * dims.dx)) + ' 0 ' +
                Math.round(dims.x1 + (mbeg[j] * dims.dx)) + ' ' + dims.height + ' ');
            obj.tickXx.push(5 + Math.round(dims.x1 + (mbeg[j] * dims.dx)));
        }

        obj.title = typ.title;

    }

}
