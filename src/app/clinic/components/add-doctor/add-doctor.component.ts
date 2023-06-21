import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {DoctorModel} from "../../../shared/model/doctor-model";
import {DoctorService} from "../../../shared/services/doctor.service";
import {DoctorSpecializationModel} from "../../../shared/model/doctor-specialization-model";
import {DoctorTitleModel} from "../../../shared/model/doctor-title-model";
import {DoctorTitleService} from "../../../shared/services/doctorTitle.service";
import {DoctorSpecializationService} from "../../../shared/services/doctor-specialization.service";
import {ClinicService} from "../../../shared/services/clinic.service";
import {ClinicModel} from "../../../shared/model/clinic-model";

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit{

  titles:DoctorTitleModel[]=[];
  specs:DoctorSpecializationModel[]=[];
  clinics:ClinicModel[]=[];
  errorMsg='';
  form:FormGroup;

constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
            private doctorService:DoctorService, private doctorTitleService:DoctorTitleService,
            private doctorSpecializationService:DoctorSpecializationService,
            private clinicService:ClinicService) {
}

ngOnInit(): void {
  this.doctorTitleService.getAllDoctorTitles().subscribe(value => {
    this.titles = value;
  });

  this.doctorSpecializationService.getAllDoctorSpecs().subscribe(value => {
    this.specs = value;
  });

  this.clinicService.getAllClinics().subscribe(value => {
    this.clinics = value;
    console.log(value)
  });
  this.form = this.formBuilder.group({
    name:['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(30)]],
    phoneNumber:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],
    clinic:['', [Validators.required]],
    specialization:['', Validators.required],
    title:['', [Validators.required]],
    price:['', [Validators.required, Validators.min(1)]],
  });
}

signup(){
  if(this.form.valid){
    let doctor= new DoctorModel();
    doctor.status = 'Pending';
    doctor.doctorSpecialization = new DoctorSpecializationModel(+this.form.controls['specialization'].value);
    doctor.doctorTitle = new DoctorTitleModel(+this.form.controls['title'].value);
    doctor.ticketPrice = +this.form.controls['price'].value;
    doctor.phoneNumber = this.form.controls['phoneNumber'].value;
    doctor.fullName = this.form.controls['name'].value;
    doctor.clinic =  new ClinicModel(+this.form.controls['clinic'].value);

    this.doctorService.addDoctor(doctor).subscribe(value => {
      this.swAlertService.success('Added Successfully');
    }, error=>{
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
