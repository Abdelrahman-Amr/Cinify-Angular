import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit{

  titles=['Giza', 'Cairo']
form:FormGroup;

constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService) {
}

ngOnInit(): void {
  this.form = this.formBuilder.group({
    name:['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(30)]],
    phone:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],
    specialization:['', Validators.required],
    title:['', [Validators.required]],
    price:['', [Validators.required, Validators.min(1)]],
  });
}

signup(){
  if(this.form.valid){
    this.swAlertService.success('SignedUp Successfully');
  }
}


}
