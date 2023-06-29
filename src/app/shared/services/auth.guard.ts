import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {SecurityService} from "./security.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private securityService:SecurityService, private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token=localStorage.getItem('token');
    // @ts-ignore
    let status=JSON.parse(localStorage.getItem('user'))?.status==='Accepted';
    let ret=null;
    if(token) {

       if ((route.data['name']=='client' && !this.securityService.isClinic()))
       {
         return true;
       }

       if(route.data['name']=='clinic' && this.securityService.isClinic()&&status){
         return true;
      }
      if(route.data['name']=='clinic' && this.securityService.isClinic()){
        return   this.router.navigate(['/clinic']);
      }
      console.log(route.data['name']=='client');
      console.log(route.data['isCheckout']=='true');
       if(route.data['name']=='client' &&route.data['isCheckout']=='true'){
        return   this.router.navigate(['/login/1'],);

      }
      return   this.router.navigate(['/']);

    }else{
      if(route.data['name']=='client' &&route.data['isCheckout']=='true'){
        return   this.router.navigate(['/login/1'],);

      }else {
        return this.router.navigate(['/']);
      }

    }
  }
}

