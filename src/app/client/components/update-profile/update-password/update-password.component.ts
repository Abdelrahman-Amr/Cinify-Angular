import { Component, OnInit  } from '@angular/core';
import { UpdateProfileService } from 'src/app/shared/services/update-profile.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Constants } from 'src/app/shared/constatnts';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  profileForm: FormGroup;
 
  constructor(private updateProfileService:UpdateProfileService,private formBuilder: FormBuilder){
      
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
      name:['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(30)]],

      phone:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],

      dob:['', [Validators.required]],
      email:['', [Validators.required, Validators.pattern(Constants.EMAIL)]],

      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]],

      gender:['male',[Validators.required]],

    });
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

  submitForm(){}

}
