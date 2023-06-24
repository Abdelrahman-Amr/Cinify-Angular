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
      const modifiedReq = req.clone({

        headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
      });
       return next.handle(modifiedReq);

    // })));
  }
}
