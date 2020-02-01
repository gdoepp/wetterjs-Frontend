// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WetterService } from '../wetter.service';
import {TableBase} from '../TableBase';
import { Zeit } from '../Periode';
import { environment } from '../../environments/environment';
import { DataTransferService } from '../datatransfer.service';

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

  constructor( wetter: WetterService,  route: ActivatedRoute, toParent: DataTransferService) {
    super(route, wetter, toParent);
    this.value = 'List';
   }

   prepare() {
     super.prepare();
     this.title = this.perObj.title;
   }

   ngOnInit() {
   this.init();
  }

  downloadMonate() {
    window.location.href = this.wetterUrl + '/downloadMonate?jahr=' + this.time + '&stat=' + this.stat;
  }

  downloadMonat() {
    window.location.href = this.wetterUrl + '/downloadMonat?monat=' + this.time + '&stat=' + this.stat;
  }
  downloadTag() {
    window.location.href = this.wetterUrl + '/downloadTag?tag=' + this.time + '&stat=' + this.stat;
  }

}
