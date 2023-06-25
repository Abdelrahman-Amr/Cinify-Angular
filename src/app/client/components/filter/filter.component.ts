import { Component } from '@angular/core';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  sortTypes: { label: string, value: any, order:string }[] = [
    { label: 'Price High To Low', value: 'ticketPrice', order: 'DESC' },
    { label: 'Price Low To High', value: 'ticketPrice', order:'ASC' },
    { label: 'Rating', value: 'averageRating', order:'DESC' }
  ];
  constructor(public filterService:FilterService){
    
  }
  addSortParams(sortType: any) {

    this.filterService.sortType = sortType.value;
    this.filterService.order = sortType.order
    this.filterService.submitSearchbutton();

  }
}
