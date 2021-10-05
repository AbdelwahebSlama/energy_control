import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbWindowRef} from '@nebular/theme';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../../../../services/api/api.service';

@Component({
  templateUrl: 'window-form.component.html',
  styleUrls: ['window-form.component.scss'],
})
export class WindowFormComponent implements OnInit, OnDestroy {
  interval = ['0h', '1h', '2h', '3h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h',
    '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];
  registerForm: FormGroup;
  submitted = true;


  constructor(public windowRef: NbWindowRef, private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  ngOnInit(): void {
    // this.apiService.device_id.subscribe(
    //   (id) => {
    //     console.log('id device ', id);
    //   },
    // );
    this.registerForm = this.formBuilder.group({
      high_alarm: ['', Validators.required],
      low_alarm: ['', Validators.required],
      low_warning: ['', Validators.required],
      high_warning: ['', Validators.required],
    });
  }

  close() {
    this.windowRef.close();
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
  }

  ngOnDestroy(): void {
    this.submitted = false;
  }
}
