import { Component ,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constatnts';
import { PatientModel } from 'src/app/shared/model/patient-model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { SwAlertService } from 'src/app/shared/services/sw-alert.service';
import { UpdateProfileService } from 'src/app/shared/services/update-profile.service';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css']
})
export class UpdateUserDataComponent implements OnInit {
  profileForm: FormGroup;
  errorMsg='';

  //@ts-ignore
  patient:PatientModel=JSON.parse(localStorage.getItem('user'));

  constructor(private updateProfileService:UpdateProfileService
    ,private formBuilder: FormBuilder,private patientService:PatientService,private router: Router,public swaAlert:SwAlertService){
    this.updateProfileService.isActive='profile';


  }


  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      //@ts-ignore
      name: [this.patient.fullName,[Validators.required, Validators.minLength(3),
        Validators.maxLength(30)]],
      //@ts-ignore
      email: [this.patient.email, [Validators.required,Validators.pattern(Constants.EMAIL)]],
      //@ts-ignore
      phone: [this.patient.phoneNumber,[Validators.required,Validators.pattern(Constants.DIGITS_ONLY_11)]],
      //@ts-ignore
      birthday: [this.patient.birthDate,[Validators.required,this.patientService.minAge(15, 'You must be at least 15 years old')]],
    });

  }

  submitForm(){
    if(this.profileForm.get('name')?.value!=null||this.profileForm.get('name')?.value!=''){
      this.patient.fullName=this.profileForm.get('name')?.value;
    }
    if(this.profileForm.get('email')?.value!=null||this.profileForm.get('email')?.value!=''){
      this.patient.email=this.profileForm.get('email')?.value;
     }

     if(this.profileForm.get('phone')?.value!=null||this.profileForm.get('phone')?.value!=''){
      this.patient.phoneNumber=this.profileForm.get('phone')?.value;
     }

     if(this.profileForm.get('birthday')?.value!=null||this.profileForm.get('birthday')?.value!=''){
      this.patient.birthDate=this.profileForm.get('birthday')?.value;
     }


    this.patientService.updatePatientProfile(this.patient);
    localStorage.setItem('user', JSON.stringify(this.patient));
    this.swaAlert.success("Patient Profile Updated Successe");
    this.router.navigate(['']);
  }
}
