import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { WetterService } from '../wetter.service';
import { IWertListe } from '../IWertListe';
import { DiagramBase } from '../DiagramBase';
import { DataTransferService} from '../datatransfer.service';
import { Jahr, Monat, Tag, Zeit } from '../Periode';

@Component({
  selector: 'app-diagram-dr',
  templateUrl: './diagram-dr.component.html',
  styleUrls: ['./diagram-dr.component.css']
})
export class PeriodeDrComponent extends DiagramBase implements OnInit {

  private value;
  private data;
  private per: string;

  constructor(private route: ActivatedRoute, private wetter: WetterService, private toParent: DataTransferService) {
    super();
    this.data = {};
  }

  ngOnInit() {
    console.log('parent: ' + this.route.parent.component.valueOf());
    this.route.paramMap.subscribe(params => {
      const time = params.get('time');
      const stat = params.get('stat');
      this.value = params.get('value');
      this.per = params.get('per');

      const func = this.wetter['getList' + this.per];

      return this.wetter.getListPeriode(time, this.per, stat).subscribe( data  => {
        console.log('preparing list');
        this.data = {};
        this.data.rows = data;
        let perObj: Zeit;

        switch (this.per) {
          case 'Monate': perObj = new Jahr(Number.parseInt(time)); break;
          case 'Monat': perObj = new Monat(time); break;
          case 'Tag': perObj = new Tag(time, 1); break;
          case 'Tage': perObj = new Tag(time, 1); break;
          default: console.log('error: periode not known - ' + this.per);
        }

        this.data.vorher = perObj.vorher;
        this.data.nachher = perObj.nachher;
        this.data.super = perObj.super;

        this.preparePhen(this.data, perObj, this.value);
      });

    });

  }

  goto(t: string, dir: string) {
    console.log('emitting event goto... ' + t + ' ' + dir);
    let per = this.per;
    if (dir === 'up') {
      if (this.per === 'Monat') { per = 'Monate'; }
      if (this.per === 'Tag') { per = 'Monat'; }
    }
    if (dir === 'down') {
      if (this.per === 'Monate') { per = 'Monat'; }
      if (this.per === 'Monat') { per = 'Tag'; }
    }
    console.log('per: ' + per);
    this.toParent.sendToParent({time: t, value: this.value, per: per});
  }

}
