import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { WetterService } from '../wetter.service';
import {IWertListe} from '../IWertListe';
import {TableBase} from '../TableBase';

@Component({
  selector: 'app-auswahl',
  templateUrl: './auswahl.component.html',
  styleUrls: ['./auswahl.component.css']
})

export class AuswahlComponent extends TableBase implements OnInit {

  public tag: string;
  constructor(private wetter: WetterService, private route: ActivatedRoute) {
    super();
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>
      this.wetter.getAuswahl(params.get('stat')).subscribe( data  => {
        console.log('preparing list');
        this.prepareList(data);
        this.data = data;
        if (data.rows.length > 0) {
          this.tag = data.rows[0].tag;
        }

   }));
  }
}
