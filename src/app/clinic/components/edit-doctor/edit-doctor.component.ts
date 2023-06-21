import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {Constants} from "../../../shared/constatnts";
import {DoctorModel} from "../../../shared/model/doctor-model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DoctorService} from "../../../shared/services/doctor.service";
import {DoctorTitleService} from "../../../shared/services/doctorTitle.service";
import {DoctorTitleModel} from "../../../shared/model/doctor-title-model";
import {DoctorSpecializationModel} from "../../../shared/model/doctor-specialization-model";
import {DoctorSpecializationService} from "../../../shared/services/doctor-specialization.service";

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit{

  form:FormGroup;
  titles:DoctorTitleModel[]=[];
  specs:DoctorSpecializationModel[]=[];
  errorMsg='';
  constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
              @Inject(MAT_DIALOG_DATA) public doctor: DoctorModel,
              private doctorService:DoctorService, private doctorTitleService:DoctorTitleService,
              private doctorSpecializationService:DoctorSpecializationService) {
  }

  ngOnInit(): void {
    console.log(this.doctor.isDeleted)
    this.doctorTitleService.getAllDoctorTitles().subscribe(value => {
      this.titles = value;
    });

    this.doctorSpecializationService.getAllDoctorSpecs().subscribe(value => {
      this.specs = value;
    });
    this.form = this.formBuilder.group({
      name:[this.doctor.fullName, [Validators.required, Validators.minLength(3),
        Validators.maxLength(30)]],
      phoneNumber:[this.doctor.phoneNumber, [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],
      specialization:[this.doctor.doctorSpecialization.id, Validators.required],
      title:[this.doctor.doctorTitle.id, [Validators.required]],
      price:[this.doctor.ticketPrice, [Validators.required, Validators.min(1)]],
      isDeleted:[this.doctor.isDeleted]
    });
  }

  update(){
    if(this.form.valid){
      let doctor= new DoctorModel();
      doctor.id = this.doctor.id;
      doctor.clinic = this.doctor.clinic;
      doctor.averageRating = this.doctor.averageRating;
      doctor.ratingCount = this.doctor.ratingCount;
      doctor.status = this.doctor.status;
      doctor.doctorSpecialization = new DoctorSpecializationModel(+this.form.controls['specialization'].value);
      doctor.doctorTitle = new DoctorTitleModel(+this.form.controls['title'].value);
      doctor.ticketPrice = +this.form.controls['price'].value;
      doctor.phoneNumber = this.form.controls['phoneNumber'].value;
      doctor.fullName = this.form.controls['name'].value;
      doctor.isDeleted = this.form.controls['isDeleted'].value;

      this.doctorService.updateDoctor(doctor).subscribe(value => {
        this.swAlertService.success('Updated Successfully');
        console.log("noo")
      }, error=>{
        console.log("errorr")
        const formControl = this.form.get(error.error.field);
        this.errorMsg = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
      });
    }
  }



}
