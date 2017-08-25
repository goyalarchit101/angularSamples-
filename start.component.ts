import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { appDetail } from './appDetail.interface'
import { GlobalValidator } from "app/shared/globalValidator";
import { IMyDpOptions, IMyInputFieldChanged, IMyDateModel } from "mydatepicker";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {
  
  public submitted: boolean;
  myForm: FormGroup;
  email: AbstractControl;
  require: boolean;
  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',    
    editableDateField: false
  };

  constructor(private fb: FormBuilder) { }
  onInputFieldChanged(event: IMyInputFieldChanged) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
    //debugger;
    if (event.value == "")
      this.require = false;
    else
      this.require = true;
  }


  ngOnInit() {
    this.myForm = this.fb.group({
      appName: ['testapp', Validators.required],
      firstAndLastName: ['testfirstAndLastName', Validators.required],
      appId: ['testappAppId', [<any>Validators.required]],
      email: ['testapp@test.com', Validators.compose([Validators.required, GlobalValidator.mailFormat])],
      pcm: ['testappAppId', [<any>Validators.required]],
      title: ['testappAppId', [<any>Validators.required]],
      vp: ['testVP', [<any>Validators.required]],// 
      deployementDate: [null, GlobalValidator.dateTimeAndRequiredFormat]
    });
    
  }


  save(model: appDetail, isValid: boolean) {
    this.submitted = true; // set form submit to true

    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);
  }

}
