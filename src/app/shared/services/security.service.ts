import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DoctorTitleModel} from "../model/doctor-title-model";
import {Constants} from "../constatnts";
import {LoginModel} from "../model/login-model";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }

  getAuthCode(): Observable < DoctorTitleModel[] > {
    return this.httpClient.get<DoctorTitleModel[]>(Constants.authURL,{
    });
  }
  getJWT(code:string): Observable < DoctorTitleModel[] > {
    return this.httpClient.get<DoctorTitleModel[]>(Constants.jwtURL,{
    });
  }

  login(loginModel:LoginModel): Observable <any> {
    return this.httpClient.post<any>(Constants.loginURL,loginModel,{
    });
  }

}
