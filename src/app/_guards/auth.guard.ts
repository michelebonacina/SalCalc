import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../_model';
import { environment } from '../../environments';
import { AlertService } from '../_services';

// check navigation authorization
// - canActivate: check user authentication for proceed, otherwise redirect to login page
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate
{
    
    // create a new guard
    constructor(
        private router: Router,                 // navigation router
        private alertService: AlertService,     // alert service
    ) { }

    // check if the user is logged for authorize navigation
    // otherwise redirect to login page
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean
    {
        // check authorization
        var currentUser: User = JSON.parse(sessionStorage.getItem('currentUser'));
        var now: number = new Date().getTime();
        if (currentUser && now - currentUser.lastActionTimestamp < environment.sessionTimeoutMillis)
        {
            // the user is logged and the session is not expired
            // update last user action
            currentUser.lastActionTimestamp = now;
            // store authenticated user in session
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
            // can proceed
            return true;
        }
        else 
        {
            // the user is not logged or the session ix expired
            // remove stored user from session
            sessionStorage.removeItem('currentUser');
            // show expired session error
            this.alertService.error("Session expired!", true);
            // redirect to login page
            this.router.navigate(['/index.html?page=login'], { queryParams: { returnUrl: state.url } });
            // cannot proceed
            return false;
        }
    } // canActivate
    
}
