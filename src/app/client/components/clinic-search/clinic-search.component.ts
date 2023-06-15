import { Component } from '@angular/core';

@Component({
  selector: 'app-clinic-search',
  templateUrl: './clinic-search.component.html',
  styleUrls: ['./clinic-search.component.css']
})
export class ClinicSearchComponent {
  selectedSpeciality: string;
  selectedGovernorate: string;
  specialties: string[] = [
    "Skin", "Teeth", "Psyciatry", "Ear, Nose and Throat"
  ];
  governorates: string[] = [
    "Giza", "Dakahlia", "Cairo"
  ];
  cities: string[] = [
    "Mansoura", "6th Of October"
  ]
}
