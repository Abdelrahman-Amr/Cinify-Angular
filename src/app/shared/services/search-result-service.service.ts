import { Injectable } from '@angular/core';
import {DoctorModel} from "../model/doctor-model";
import {BehaviorSubject, Subject} from "rxjs";
import {PageResult} from "../model/page-result";

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {
  doctorsSearchResult:DoctorModel[]=[];
  doctorsSubject:BehaviorSubject<PageResult<DoctorModel>> = new BehaviorSubject<PageResult<DoctorModel>>(new PageResult());
  constructor() { }
}
