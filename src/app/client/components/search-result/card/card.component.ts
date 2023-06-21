import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  stars = [1, 2, 3, 4, 5];
  @Input() rate = 4;
  setRate(newRate: number) {
    this.rate = newRate;
  }

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

}
