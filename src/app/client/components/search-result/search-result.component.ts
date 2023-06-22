import { Component } from '@angular/core';
import { SearchResultService } from '../../search-result-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
constructor(private searchResultService:SearchResultService){
}
}
