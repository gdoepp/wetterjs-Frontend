// (c) Gerhard Döppert, 2018, GNU GPL 3

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WetterService } from '../wetter.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public result = { update: 2 };

  constructor(private wetter: WetterService, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      const link = params.get('link');

      this.wetter.post(link).subscribe( data  => {
      this.result.update = data['update'];
        });
  });
  }
}
