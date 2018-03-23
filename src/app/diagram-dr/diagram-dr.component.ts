import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WetterService } from '../wetter.service';
import { DataTransferService} from '../datatransfer.service';
import { PeriodeDpComponent } from '../diagram-dp/diagram-dp.component';

@Component({
  selector: 'app-diagram-dr',
  templateUrl: './diagram-dr.component.html',
  styleUrls: ['./diagram-dr.component.css']
})
export class PeriodeDrComponent extends PeriodeDpComponent implements OnInit {


  constructor(route: ActivatedRoute, wetter: WetterService, toParent: DataTransferService) {
    super(route, wetter, toParent);
  }

  ngOnInit() {
    this.init(0);
  }

}
