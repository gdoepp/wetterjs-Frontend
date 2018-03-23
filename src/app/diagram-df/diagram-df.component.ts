import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WetterService } from '../wetter.service';
import { DiagramBase } from '../DiagramBase';
import { DataTransferService} from '../datatransfer.service';

@Component({
  selector: 'app-diagram-df',
  templateUrl: './diagram-df.component.html',
  styleUrls: ['./diagram-df.component.css']
})
export class PeriodeDfComponent extends DiagramBase implements OnInit {

  constructor( route: ActivatedRoute,  wetter: WetterService,  toParent: DataTransferService) {
    super(route, wetter, toParent);
  }

  ngOnInit() {
    this.init(0);
  }

  prepare() {

    const obj = this.data;
    const typ = this.perObj;
    const feld = this.value;

    const windCols = { 'windf': 'cyan', 'windf_max': 'violet' };

    const values = ['windf', 'windf_max'];

    const data = obj.rows;
    obj.rows = undefined;

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
