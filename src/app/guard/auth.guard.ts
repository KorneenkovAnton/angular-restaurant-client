import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem("accessToken") != null && localStorage.getItem("refreshToken") != null){
      if(localStorage.getItem("role") != null && localStorage.getItem("role") ==="ADMIN"){
        return true;
      }else {
        location.replace("/login");
        return false;
      }
    }else {
      console.log("Access denied, Unauthorized user");
      location.replace("/login");
      return false;
    }
  }
}
