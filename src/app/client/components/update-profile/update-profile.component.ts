import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateProfileService } from 'src/app/shared/services/update-profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  constructor(public updateProfileService :UpdateProfileService){
    
  }
}
