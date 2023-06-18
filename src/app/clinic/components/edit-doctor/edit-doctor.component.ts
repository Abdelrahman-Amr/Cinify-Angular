import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {Constants} from "../../../shared/constatnts";
import {DoctorModel} from "../../../shared/model/clinic/doctor-model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent {

  titles=['Giza', 'Cairo']
  form:FormGroup;

  constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
              @Inject(MAT_DIALOG_DATA) public doctor: DoctorModel) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:[this.doctor.fullName, [Validators.required, Validators.minLength(3),
        Validators.maxLength(30)]],
      phone:[this.doctor.phoneNumber, [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],
      specialization:[this.doctor.doctorSpecialization, Validators.required],
      title:[this.doctor.doctorTitle, [Validators.required]],
      price:[this.doctor.ticketPrice, [Validators.required, Validators.min(1)]],
    });
  }

  update(){
    if(this.form.valid){
      this.swAlertService.success('Updated Successfully');
    }
  }



}
