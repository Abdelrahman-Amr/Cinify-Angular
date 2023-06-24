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
    if(token) {
       if ((route.data['name']=='client' && !this.securityService.isClinic())
         || (route.data['name']=='clinic' && this.securityService.isClinic())){
        return true;
      }else{
      return   this.router.navigate(['/']);
       }
    }else if(route.data['name']=='client' &&route.data['isCheckout']=='true'){
      return   this.router.navigate(['/login/1'],);

    }
    else{
      return this.router.navigate(['/']);
    }
  }
}

