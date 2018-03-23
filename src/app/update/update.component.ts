import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { WetterService } from '../wetter.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public result;

  constructor(private wetter: WetterService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const stat = params.get('stat');
      const op = params.get('operation');
      if (op === 'update') {
        this.wetter.update(stat).subscribe( data  => {
          this.result = data;
        });
      }
      if (op === 'importHist') {
        this.wetter.importHist(stat).subscribe( data  => {
          this.result = data;
        });
      }
  });
  }
}
