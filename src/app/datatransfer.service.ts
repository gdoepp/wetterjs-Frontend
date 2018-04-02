// (c) Gerhard Döppert, 2018, GNU GPL 3

// this service informs the main component about changes triggered by some child below router-outlet

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class DataTransferService {

  private childData = new BehaviorSubject<any>([]);

  fromChild = this.childData.asObservable();

  sendToParent(data) {
    this.childData.next(data);
  }
}
