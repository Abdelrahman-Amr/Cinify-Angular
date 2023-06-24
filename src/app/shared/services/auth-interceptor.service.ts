import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {SecurityService} from "./security.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private securityService:SecurityService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // return  this.securityService.logInEvent.pipe(take(1),exhaustMap((value => {
      //   if(!value || req.headers.get('skip')){
      //     return next.handle(req);
      //   }
    let modifiedReq:HttpRequest<any>;
    if(localStorage.getItem('token')){
      modifiedReq = req.clone({
        headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
      });
    }else{
      modifiedReq = req.clone({
      });
    }
       return next.handle(modifiedReq);

    // })));
  }
}
