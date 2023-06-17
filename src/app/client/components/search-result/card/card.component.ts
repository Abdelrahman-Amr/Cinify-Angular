import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  stars = [1, 2, 3, 4, 5];
  @Input() rate = 4;
  @Output() change = new EventEmitter<number>();
  setRate(newRate: number) {
    this.rate = newRate;
    this.change.emit(newRate);
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
    }
  ];
  slides: any = [[]];
  chunk(arr: any, chunkSize: any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 3);
  }
}
