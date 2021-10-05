import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DevicesAlertService} from '../../services/device/devices-alert.service';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'ngx-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent implements OnInit {
  l_alarm = 2500;
  h_alarm = 3000;
  h_warning = 1000;
  l_warning = 1500;

  constructor(private devicesAlertService: DevicesAlertService,
              private router: Router, private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  onSubmit(addForm: NgForm) {
    this.apiService.postAjoutdevice(addForm.value).subscribe(
      (data) => {
        // console.log('ajouter device ', data);
        this.router.navigate(['/pages/dashboard']);
      },
    );
  }

}
