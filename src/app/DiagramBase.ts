//  (c) Gerhard Döppert, 2017, GNU GPL 3

import { Zeit } from './Periode';

export class DiagramBase {

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

        if (dims.minUnits && dims.mxy >= dims.mny && dims.mxy - dims.mny < dims.minUnits) {
            if (center) {
                const rest = dims.minUnits - (dims.mxy - dims.mny);
                dims.mny = dims.mny - rest / 2;
                dims.mxy = dims.mxy + rest / 2;
            } else {
                dims.mxy = dims.mny + dims.minUnits;
            }
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

    prepareTemp(obj, typ: Zeit) {
        const tempCols = {
            'temp_o': 'limegreen', 'temp_i1': 'orange', 'temp_o_min': 'blue', 'temp_o_absmin': 'violet',
            'temp_o_max': 'red', 'temp_o_absmax': 'brown', 'temp_o_avg': 'green', 'temp_i1_avg': 'orange',
            'temp_o1': 'limegreen',
            'temp_i2': 'brown', 'temp_i2_avg': 'orange', 'temp_o2': 'seagreen', 'temp_i3': 'magenta', 'temp_i4': 'coral'
        };

        const tempWerte = {
            'temp_o': 'Temp', 'temp_o_min': 'Temp Min', 'temp_o_absmin': 'Temp abs Min',
            'temp_o_max': 'Temp Max', 'temp_o_absmax': 'Temp abs Max', 'temp_o_avg': 'Temp Mittel',
            'temp_i1': 'Temp innen', 'temp_i1_avg': 'Temp innen Mittel',
            'temp_i2': 'Temp innen 2', 'temp_i2_avg': 'Temp innen 2 Mittel',
            'temp_o1': 'Temp1', 'temp_o2': 'Temp2', 'temp_i3': 'Temp innen 3', 'temp_i4': 'Temp innen 4'
        };

        const data = obj.rows;
        obj.rows = undefined;

        obj.values = [];

        if (data.length > 0) {
            for (const v in data[0]) {
                if (tempWerte[v]) {
                    obj.values.push(v);
                }
            }
        }

        obj.cols = tempCols;
        obj.werte = tempWerte;

        const dims = { height: 900, width: 1600, x1: 90, minUnits: 10 };

        this.makeRange(dims, data, obj.values, typ);

        this.makeCurves(obj, data, dims, typ, obj.values);

        this.makeAxes(obj, data, dims, typ);

    }


    preparePhen(obj, typ, feld) {

        const phenCols = {
            'hum_i': 'orange', 'hum_o': 'brown', 'pres': 'blue',
            'precip': 'blue', 'sun': 'yellow', 'cloud': 'gray', 'lum_o': 'goldenrod', 'lum_i': 'darkorange'
        };

        const phenWerte = {
            'hum': 'rel. Feuchte', 'hum_o': 'rel. Feuchte', 'hum_i': 'rel. Feuchte innen', 'pres': 'Luftdruck',
            'precip': 'Niederschlag', 'sun': 'Sonne', 'cloud': 'Wolken', 'lum_o': 'Helligkeit', 'lum_i': 'Helligkeit innen'
        };

        const data = obj.rows;
        obj.rows = undefined;

        const dims = { height: 870, width: 1600, x1: 90, minUnits: 1, mny: undefined, mxy: undefined,
            scalefn: undefined, scalefninv: undefined };

        obj.cols = phenCols;
        obj.werte = phenWerte;

        const values = [];

        if (feld === 'precip') { dims.mny = 0; dims.mxy = 5; }
        if (feld === 'sun') { dims.mny = 0; dims.minUnits = (typ.heute ? 60 : 5); }
        if (feld === 'cloud') { dims.mny = 0; dims.mxy = 8; }
        if (feld === 'hum') {
            dims.minUnits = 30;
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

    prepareWind(obj, typ, feld) {

        const windCols = { 'windf': 'cyan', 'windf_max': 'violet' };

        const values = ['windf', 'windf_max'];

        const data = obj.rows;
        obj.rows = undefined;

        // console.log('d.len:'+data.length);

        const dims = { height: 870, width: 1600, x1: 90, minUnits: 5, mny: undefined, mxy: undefined,
            scalefn: undefined, scalefninv: undefined };

        dims.mny = 0;

        this.makeRange(dims, data, values, typ);

        this.makeRects(obj, data, dims, typ, values);

        obj.windd = [];
        obj.windv = [];

        for (let k = 0; k < data.length; k++) {
            const tv = data[k];
            if (tv.windf) {
                obj.windd.push(tv.windd[1]);
                obj.windv.push(tv.windd[0] / tv.windf);
            }
        }

        this.makeAxes(obj, data, dims, typ);
        obj.values = values;
        obj.cols = windCols;
    }
}
