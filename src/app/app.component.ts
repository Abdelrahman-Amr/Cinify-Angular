import {Component, OnInit} from '@angular/core';

import {DoctorService} from "./shared/services/doctor.service";

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
