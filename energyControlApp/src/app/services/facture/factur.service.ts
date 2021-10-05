import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturService {
  isShowFactur: Subject<boolean> = new Subject<boolean>();
  isListFactur:  Subject<boolean> = new Subject<boolean>();


  isHour: Subject<boolean> = new Subject<boolean>();
  nbrHeurSubject:  Subject<number> = new Subject<number>();
  predictSubject: Subject<number> = new Subject<number>();
  constructor() { }

  getIsShowFactur(val: boolean) {
    this.isShowFactur.next(val);
  }
  getIsListFactur(val: boolean) {
    this.isListFactur.next(val);
  }

  getpredictSubject(val: number) {
    this.predictSubject.next(val);
  }

  getisHour(bol) {
    this.isHour.next(bol);
  }
  getnbrHeurSubject(bol: number) {
    this.nbrHeurSubject.next(bol);
  }
}
