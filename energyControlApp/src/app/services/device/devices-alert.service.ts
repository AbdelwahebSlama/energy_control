import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DevicesAlertService {

  constructor() {
  }

  addDevice(credentials) {
    console.log(' ', credentials);
  }
}
