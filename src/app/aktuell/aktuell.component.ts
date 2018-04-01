import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { WetterService } from '../wetter.service';
import {TableBase} from '../TableBase';
import { DataTransferService } from '../datatransfer.service';

@Component({
  selector: 'app-aktuell',
  templateUrl: './aktuell.component.html',
  styleUrls: ['./aktuell.component.css']
})

export class AktuellComponent extends TableBase implements OnInit {

  public tag: string;
  constructor(wetter: WetterService, route: ActivatedRoute, toParent: DataTransferService) {
    super(route, wetter, toParent);
   }

  ngOnInit() {
    this.init();
    this.value = '-';
  }
}
