// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { WetterService } from '../wetter.service';
import { DataTransferService} from '../datatransfer.service';
import {IWertListe} from '../IWertListe';
import {TableBase} from '../TableBase';
import { Jahr, Monat, Tag, Zeit } from '../Periode';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent extends TableBase implements OnInit {
  public per: string;
  public data;
  public perObj: Zeit;
  public time: string;
  public index_id: string;
  public index_name: string;
  public name: string;
  public title: string;
  private wetterUrl = environment.baseUrl;

  constructor(private wetter: WetterService, private route: ActivatedRoute, private toParent: DataTransferService) {
    super();
   }

   ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.time = params.get('time');
      this.stat = Number.parseInt(params.get('stat'));
      this.per = params.get('per');

      this.wetter.getListPeriode(this.time, this.per, this.stat.toString()).subscribe( data  => {
        console.log('preparing list');
        this.data = {};
        this.data.rows = data;
        let perObj: Zeit;

        switch (this.per) {
        case 'Monate':
          perObj = new Jahr(Number.parseInt(this.time));
          this.index_id = 'monat'; this.index_name = 'monat'; this.name = 'Monat';
          break;
        case 'Monat':
          perObj = new Monat(this.time);
          this.index_id = 'time_d'; this.index_name = 'tag'; this.name = 'Tag';
          break;
        case 'Tag':
          perObj = new Tag(this.time, 1);
          this.index_id = 'time_t'; this.index_name = 'time_t'; this.name = 'Zeit';
          break;
        default: console.log('error: periode not known - ' + this.per);
        }

        this.title = perObj.title;
        this.data.vorher = perObj.vorher;
        this.data.nachher = perObj.nachher;
        this.data.super = perObj.super;
        this.perObj = perObj;
        this.prepareList(this.data);
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
    this.toParent.sendToParent({time: t, value: 'List', per: per});
  }

  downloadMonate() {
    window.location.href = this.wetterUrl + 'downloadMonate?jahr=' + this.time + '&stat=' + this.stat;
  }

  downloadMonat() {
    window.location.href = this.wetterUrl + 'downloadMonat?monat=' + this.time + '&stat=' + this.stat;
  }
  downloadTag() {
    window.location.href = this.wetterUrl + 'downloadTag?tag=' + this.time + '&stat=' + this.stat;
  }

}
