// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WetterService } from '../wetter.service';
import { DataTransferService } from '../datatransfer.service';

@Component({
  selector: 'app-formdd',
  templateUrl: './formdd.component.html',
  styleUrls: ['./formdd.component.css']
})
export class FormddComponent implements OnInit {

  public dusk: string;
  public dawn: string;
  public tag: string;
  public data = {};

  constructor(public wetter: WetterService, public route: ActivatedRoute, public toParent: DataTransferService) {
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { // will be unsubscribed by route
      const link = params.get('link');
      if (link) {
          console.log('update link: ' + link);
          this.updateLink(link);
        }
    });
  }

  updateLink(link) {
    this.wetter.getListLink(link).subscribe( this.processData.bind(this)); // will be unsubscribed automatically
  }

  processData(data) {
    console.log('got data');

    this.dawn = data.day.dawn ? new Date(data.day.dawn).toLocaleTimeString('de-DE') : '?';
    this.dusk = data.day.dusk ? new Date(data.day.dusk).toLocaleTimeString('de-DE') : '?';
    this.tag =  data.time;
    this.toParent.sendToParent({operation: 'params', time: this.tag, per: 'Tag', value: 'DawnDusk', stat: '00000'});

    if (data.links) {
      for (const link of data.links) {
          this.data[link.rel + 'link'] = link.href;
      }
    }
  }

  link(lnk: string, where: string) {
    console.log('send link: ' + lnk + ' ' + where);
    this.toParent.sendToParent({operation: 'link', link: lnk, value: (where === 'up' ? 'daylen' : 'DawnDusk')} );
}
}
