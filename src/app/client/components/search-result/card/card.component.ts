import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {DoctorService} from "../../../../shared/services/doctor.service";
import {DoctorModel} from "../../../../shared/components/header/model/doctor-model";
import { SearchResultService } from 'src/app/shared/services/search-result-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  stars = [1, 2, 3, 4, 5];
  @Input() rate = 4;
  setRate(newRate: number) {
    this.rate = newRate;
  }
  doctors:DoctorModel[]=[];
  page:number=1;
  limit=10;
  totalCount=0;


  cards = [
    {
      title: '1',
      day: 'today',
      from: '12:00 PM',
      to: '1:00 PM'
    },
    {
      title: '2',
      day: 'tommorow',
      from: '2:00 PM',
      to: '4:00 PM'
    },
    {
      title: '3',
      day: 'Mon 06/19',
      from: '5:00 PM',
      to: '7:00 PM'
    },
    {
      title: '4',
      day: 'Mon 06/22',
      from: '8:00 PM',
      to: '10:00 PM'
    },
    {
      title: '4',
      day: 'Tues 8/1',
      from: '8:00 PM',
      to: '10:00 PM'
    }
  ];

  constructor(private doctorService:DoctorService) {
  }

  ngOnInit(): void {

    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
      this.totalCount=value.totalCount;
    });

  }

  nextPage(){
    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
    });
  }

}
