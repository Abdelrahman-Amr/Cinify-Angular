import { Component ,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constatnts';
import { PatientModel } from 'src/app/shared/model/patient-model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { UpdateProfileService } from 'src/app/shared/services/update-profile.service';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css']
})
export class UpdateUserDataComponent implements OnInit {
  profileForm: FormGroup;
  //@ts-ignore
  patient:PatientModel=JSON.parse(localStorage.getItem('user'));

  constructor(private updateProfileService:UpdateProfileService
    ,private formBuilder: FormBuilder,private patientService:PatientService,private router: Router){
    this.updateProfileService.isActive='profile';
    
   
  }
  minAge(minAge: number, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const currentDate = new Date();
  
      const diffYears = currentDate.getFullYear() - birthDate.getFullYear();
      const diffMonths = currentDate.getMonth() - birthDate.getMonth();
      const diffDays = currentDate.getDate() - birthDate.getDate();
  
      if (diffYears < minAge || (diffYears === minAge && diffMonths < 0) || (diffYears === minAge && diffMonths === 0 && diffDays < 0)) {
        return { 'minAge': { message: errorMessage } };
      }
  
      return null;
    };
  }

  ngOnInit(): void {
    
    this.profileForm = this.formBuilder.group({
      //@ts-ignore
      name: [patient.fullName,[ Validators.minLength(3),
        Validators.maxLength(30)]],
      //@ts-ignore
      Email: [patient.email, [Validators.pattern(Constants.EMAIL)]],
      //@ts-ignore
      phone: [patient.phoneNumber,[Validators.pattern(Constants.DIGITS_ONLY_11)]],
      //@ts-ignore
      birthday: [patient.birthDate,[this.minAge(15, 'You must be at least 15 years old')]],
    });

  }
  
  submitForm(){
    if(this.profileForm.get('name')?.value!=null||this.profileForm.get('name')?.value!=''){
      this.patient.fullName=this.profileForm.get('name')?.value;
    }
    if(this.profileForm.get('email')?.value!=null||this.profileForm.get('email')?.value!=''){
      this.patient.fullName=this.profileForm.get('email')?.value;   
     }

     if(this.profileForm.get('phone')?.value!=null||this.profileForm.get('phone')?.value!=''){
      this.patient.fullName=this.profileForm.get('phone')?.value;
     }

     if(this.profileForm.get('birthday')?.value!=null||this.profileForm.get('birthday')?.value!=''){
      this.patient.fullName=this.profileForm.get('birthday')?.value;
     }
    

    this.patientService.updatePatientProfile(this.patient);
    localStorage.setItem('user', JSON.stringify(this.patient));
    this.router.navigate(['']);
  }
}
