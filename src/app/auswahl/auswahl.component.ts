import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { WetterService } from '../wetter.service';
import {IWertListe} from '../IWertListe';
import {TableBase} from '../TableBase';
import { DataTransferService } from '../datatransfer.service';

@Component({
  selector: 'app-auswahl',
  templateUrl: './auswahl.component.html',
  styleUrls: ['./auswahl.component.css']
})

export class AuswahlComponent extends TableBase implements OnInit {

  public tag: string;
  constructor(wetter: WetterService, route: ActivatedRoute, toParent: DataTransferService) {
    super(route, wetter, toParent);
   }

  ngOnInit() {
    this.init();
    this.value = '-';
  }
}
