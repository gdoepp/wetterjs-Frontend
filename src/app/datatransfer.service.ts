// (c) Gerhard Döppert, 2018, GNU GPL 3

// this service informs the main component about changes triggered by some child below router-outlet

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

class Data {
  operation: string; time?: string; per?: string; value: string; stat?: string; link?: string;
}

@Injectable()
export class DataTransferService {

  private childData = new BehaviorSubject<Data>(new Data);

  fromChild = this.childData.asObservable();

  sendToParent(data: Data) {
    this.childData.next(data);
  }
}
