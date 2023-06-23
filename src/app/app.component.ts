import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {DoctorService} from "./shared/services/doctor.service";
import {AppointmentWithoutRatingService} from "./shared/services/appointment-without-rating.service";
import {SwAlertService} from "./shared/services/sw-alert.service";
import {DoctorTitleService} from "./shared/services/doctorTitle.service";
import {DoctorSpecializationService} from "./shared/services/doctor-specialization.service";
import {ClinicService} from "./shared/services/clinic.service";
import {SessionStorageService} from "./shared/services/session-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'clinify-front';

  constructor( private doctorService:DoctorService, private doctorTitleService:DoctorTitleService,
              private doctorSpecializationService:DoctorSpecializationService, private clinicService:ClinicService,
               private sessionStorageService:SessionStorageService) {
  }
  ngOnInit(): void {
    this.doctorTitleService.getAllDoctorTitles().subscribe(value => {
        this.sessionStorageService.setTitles(value);
    });

    this.doctorSpecializationService.getAllDoctorSpecs().subscribe(value => {
      this.sessionStorageService.setSpecs(value);
    });

    this.clinicService.getAllClinics().subscribe(value => {
       this.sessionStorageService.setClinics(value);
    });
  }


}
