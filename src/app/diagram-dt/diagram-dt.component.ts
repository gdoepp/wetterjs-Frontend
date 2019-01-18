// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WetterService } from '../wetter.service';
import { DiagramBase } from '../DiagramBase';
import { DataTransferService } from '../datatransfer.service';

@Component({
  selector: 'app-diagram-dt',
  templateUrl: './diagram-dt.component.html',
  styleUrls: ['./diagram-dt.component.css']
})
export class PeriodeDtComponent extends DiagramBase implements OnInit {

  constructor(route: ActivatedRoute, wetter: WetterService, toParent: DataTransferService) {
    super(route, wetter, toParent);
  }

  prepare() {
    const obj = this.data;
    const typ = this.perObj;

    const tempCols = {
        'temp_o': 'limegreen', 'temp_i1': 'orange', 'temp_o_min': 'blue', 'temp_o_absmin': 'violet',
        'temp_o_max': 'red', 'temp_o_absmax': 'brown', 'temp_o_avg': 'green', 'temp_i1_avg': 'orange',
        'temp_o1': 'limegreen',
        'temp_i2': 'brown', 'temp_i2_avg': 'orange', 'temp_o2': 'seagreen', 'temp_i3': 'magenta', 'temp_i4': 'coral',
        'temp_i5': 'lightsalmon', 'taup': 'blue'
    };

    const tempWerte = {
        'temp_o': 'Temp', 'temp_o_min': 'Temp Min', 'temp_o_absmin': 'Temp abs Min',
        'temp_o_max': 'Temp Max', 'temp_o_absmax': 'Temp abs Max', 'temp_o_avg': 'Temp Mittel',
        'temp_i1': 'Temp iW1', 'temp_i1_avg': 'Temp iW1 Mittel',
        'temp_i2': 'Temp iW2', 'temp_i2_avg': 'Temp iW2 Mittel', 'taup': 'TauPkt',
        'temp_o1': 'TempW', 'temp_o2': 'TempO', 'temp_i3': 'Temp iB', 'temp_i4': 'Temp iS', 'temp_i5': 'Temp iF'
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

  ngOnInit() {

    this.init(0.5);

  }

}
