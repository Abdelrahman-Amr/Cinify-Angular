import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../constatnts";
import {LoginModel} from "../model/login-model";
import {DoctorTitleModel} from "../components/header/model/doctor-title-model";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }


  getAuthCode(): Observable <any> {
    let codeParams = new HttpParams();
    codeParams = codeParams.append('client_id','iti-client');
    codeParams = codeParams.append('redirect_uri','https://springone.io/authorized');
    codeParams = codeParams.append('code_challenge','QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8');
    codeParams = codeParams.append('code_challenge_method','S256');
    codeParams = codeParams.append('response_type','code');

    return this.httpClient.get<any>(Constants.authURL,{
      params:codeParams
    });
  }
  getJWT(code:string): Observable < DoctorTitleModel[] > {
    return this.httpClient.get<DoctorTitleModel[]>(Constants.jwtURL,{
    });
  }

  login(loginModel:LoginModel): Observable <any> {
    const form = new FormData();
    form.append('username', loginModel.username);
    form.append('password', loginModel.password);
    return this.httpClient.post<any>(Constants.loginURL,form,{
    });
  }

  test(): Observable <any> {
    return this.httpClient.post<any>(Constants.test,{});
  }

}
