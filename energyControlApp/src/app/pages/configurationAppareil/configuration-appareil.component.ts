import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-configuration',
  templateUrl: './configuration-appareil.component.html',
  styleUrls: ['./configuration-appareil.component.scss'],
})
export class ConfigurationAppareilComponent implements OnInit {

  interval = ['0h', '1h', '2h', '3h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h',
    '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];
  registerForm: FormGroup;
  devices = [34, 192, 243, 246, 253];
  listeDevice: any;
  submitted = 122;
  id: any;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.registerForm = this.formBuilder.group({
      high_alarm: ['', Validators.required],
      low_alarm: ['', Validators.required],
      low_warning: ['', Validators.required],
      high_warning: ['', Validators.required],
      freedate: [''],
      samdi: [''],
      dimanche: [''],
      heureactivationdebut: [''],
      heureactivationfin: [''],
      demmarage: [''],
      id: [, Validators.required],
    });
    this.apiService.getDevicePerID(this.id).subscribe(
      (data) => {
        this.registerForm.get('high_alarm').setValue(data['high_alarm']);
        this.registerForm.get('low_alarm').setValue(data['low_alarm']);
        this.registerForm.get('low_warning').setValue(data['low_warning']);
        this.registerForm.get('high_warning').setValue(data['high_warning']);
      },
    );
  }


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.registerForm.get('id').setValue(Number(this.id));
    // console.log(this.registerForm.value);
    this.apiService.putConfiguration(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/pages/dashboard']);
      },
    );
  }


}
