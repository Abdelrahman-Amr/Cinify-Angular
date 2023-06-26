import { Component, OnInit  } from '@angular/core';
import { UpdateProfileService } from 'src/app/shared/services/update-profile.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Constants } from 'src/app/shared/constatnts';
import { PatientModel } from 'src/app/shared/model/patient-model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Router } from '@angular/router';
import { SwAlertService } from 'src/app/shared/services/sw-alert.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  profileForm: FormGroup;
  //@ts-ignore
 patient:PatientModel=JSON.parse(localStorage.getItem('user'));
  constructor(private updateProfileService:UpdateProfileService,private formBuilder: FormBuilder,private patientService:PatientService,
    private router :Router ,private swAlert:SwAlertService){
      this.updateProfileService.isActive="changePassword";
  }

  ngOnInit(): void {
    // this.profileForm = this.formBuilder.group({
    //   //@ts-ignore
    //   fullName: [JSON.parse(localStorage.getItem('user').fullName)],
    //   //@ts-ignore
    //   inputEmailAddress: [JSON.parse(localStorage.getItem('user').email), [Validators.email]],
    //   //@ts-ignore
    //   inputPhone: [JSON.parse(localStorage.getItem('user')).phoneNumber,Validators.minAge(JSON.parse(localStorage.getItem('user')).phoneNumber, 'You must be at least 15 years old')],
    //   //@ts-ignore
    //   inputBirthday: [JSON.parse(localStorage.getItem('user')).birthDate,[Validators.email]],
    // });
    this.profileForm = this.formBuilder.group({


      confirmPassword:['',[Validators.required,Validators.minLength(5),Validators.maxLength(30),this.passwordMismatch.bind(this)]],

        newPassword:['',[Validators.required,Validators.minLength(5),Validators.maxLength(30),this.passwordMismatch.bind(this)]],



    });
  }
  // passwordMismatch(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const password = this.profileForm.controls['newPassword'].value;
  //     const confirmPassword = this.profileForm.controls['confirmPassword'].value;
  //     // Check if password field has a value
  //     // if (password && password.value.trim()!='') {
  //       // Make confirmPassword field required
  //       // confirmPassword?.setValidators([Validators.required]);
  //           console.log("yes");
  //       // Validate if confirmation password matches the password
  //       // @ts-ignore
  //     if ( password !== confirmPassword) {
  //         return { passwordMismatch: true };
  //       // }
  //     }
  //
  //     return null;
  //   };
  // }

  passwordMismatch(control:AbstractControl):{[s:string]:boolean} | null{
    let password='';
    let confirmPassword='';

    if(this.profileForm){
       password = this.profileForm.controls['newPassword']?.value;

    }
    if(this.profileForm){
      confirmPassword = this.profileForm.controls['confirmPassword']?.value;
    }
    // const confirmPassword = this.profileForm.controls['confirmPassword']?.value;
    // Check if password field has a value
    // if (password && password.value.trim()!='') {
    // Make confirmPassword field required
    // confirmPassword?.setValidators([Validators.required]);
    console.log("yes");
    // Validate if confirmation password matches the password
    // @ts-ignore
    if ( password !== confirmPassword) {
      return { passwordMismatch: true };
      // }
    }

    return null;
  }
  // $10$41bayHvUvPh7MHklcRmAbO1BUv2Bw6wVOreEDBOXOUh8zC42a4YrK
  updatePassword():void{
    if(this.profileForm.valid){
      this.patient.password=this.profileForm.get('newPassword')?.value;
      this.patientService.changePassword(this.patient);
      console.log(this.profileForm.get('newPassword')?.value);

    localStorage.setItem('user', JSON.stringify(this.patient));
    }
  this.swAlert.success("Patient Password Updated Successe");
  this.router.navigate(['']);
}

  }





