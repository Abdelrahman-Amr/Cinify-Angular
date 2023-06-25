import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {DoctorService} from "../../../shared/services/doctor.service";

import {DoctorTitleService} from "../../../shared/services/doctorTitle.service";
import {DoctorSpecializationService} from "../../../shared/services/doctor-specialization.service";
import {ClinicService} from "../../../shared/services/clinic.service";
import {SessionStorageService} from "../../../shared/services/session-storage.service";
import { DoctorTitleModel } from 'src/app/shared/model/doctor-title-model';
import { DoctorSpecializationModel } from 'src/app/shared/model/doctor-specialization-model';
import { ClinicModel } from 'src/app/shared/model/clinic-model';
import { DoctorModel } from 'src/app/shared/model/doctor-model';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit{

  titles:DoctorTitleModel[]=[];
  specs:DoctorSpecializationModel[]=[];
  // clinics:ClinicModel[]=[];
  errorMsg='';
  clinic=new ClinicModel(0);
  form:FormGroup;
  imgTitle='Click to upload image';

  imgFile: any;
  docFile:any;
  docImgTitle='Upload Document';

constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
            private doctorService:DoctorService, private doctorTitleService:DoctorTitleService,
            private doctorSpecializationService:DoctorSpecializationService,
            private clinicService:ClinicService,  private sessionStorageService:SessionStorageService) {
}

ngOnInit(): void {
  this.titles = this.sessionStorageService.getTitles();
  this.specs = this.sessionStorageService.getSpecs();
  // this.clinics = this.sessionStorageService.getClinics();
  //
  // this.doctorTitleService.getAllDoctorTitles().subscribe(value => {
  //   this.titles = value;
  // });
  //
  // this.doctorSpecializationService.getAllDoctorSpecs().subscribe(value => {
  //   this.specs = value;
  // });
  //
  // this.clinicService.getAllClinics().subscribe(value => {
  //   this.clinics = value;
  //
  // });
  // @ts-ignore
  this.clinic= JSON.parse(localStorage.getItem('user'));
  this.form = this.formBuilder.group({
    name:['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(30)]],
    phoneNumber:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],
    clinic:[this.clinic.id, [Validators.required]],
    specialization:['', Validators.required],
    title:['', [Validators.required]],
    price:['', [Validators.required, Validators.min(1)]],
    avgMinutesPerPatient:['', [Validators.required, Validators.min(1)]],
  });
}
signup(){
  if(this.form.valid && this.docFile){
    let doctor= new DoctorModel();
    doctor.status = 'Pending';
    doctor.doctorSpecialization = new DoctorSpecializationModel(+this.form.controls['specialization'].value);
    doctor.doctorTitle = new DoctorTitleModel(+this.form.controls['title'].value);
    doctor.ticketPrice = +this.form.controls['price'].value;
    doctor.phoneNumber = this.form.controls['phoneNumber'].value;
    doctor.fullName = this.form.controls['name'].value;
    doctor.clinic =  new ClinicModel(+this.form.controls['clinic'].value);
    doctor.avgMinutesPerPatient = +this.form.controls['avgMinutesPerPatient'].value;
    doctor.isDeleted=false;
    doctor.docImg = this.docImgTitle;
    if(this.imgTitle =='Click to upload image'){
      this.imgTitle = 'doctor.avif';
    }
    doctor.imgUrl = this.imgTitle;

    this.doctorService.addDoctor(doctor).subscribe(value => {
      this.swAlertService.success('Added Successfully');
      if (this.imgTitle != 'doctor.avif') {
        this.doctorService.upload(this.imgFile, value.message).subscribe(() => {
        });
      }
          this.doctorService.upload(this.docFile, this.docImgTitle).subscribe(() => {
          });

    }, error=>{
      const formControl = this.form.get(error.error.field);
      this.errorMsg = error.error.message;
      if (formControl) {
        formControl.setErrors({
          serverError: true
        });
      }else{
        this.swAlertService.fail('Failed to Add Doctor');
      }
    });
  }
  }

  onImageChange(event:any){
     this.imgTitle = event.target.files[0].name;
     this.imgFile = event.target.files[0];
  }

  onDocChange(event:any){
    this.docImgTitle = event.target.files[0].name;
    this.docFile = event.target.files[0];
  }



}
