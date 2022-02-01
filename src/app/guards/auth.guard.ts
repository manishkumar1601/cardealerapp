import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  data: string;

  constructor(private cookieSer: CookieService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.cookieSer.get('activeUser') && JSON.parse(this.cookieSer.get('activeUser'))) {
      if(state.url === '/dealers'){
        const cookie: IUser = JSON.parse(this.cookieSer.get('activeUser'))
        if(cookie.type === 'admin')
        {
          return true;
        } else{
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }
}
