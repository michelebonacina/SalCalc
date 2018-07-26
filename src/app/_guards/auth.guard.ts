import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate
{
    // create a new guard
    constructor(private router: Router) { }

    // check if the user is logged for authorize navigation
    // otherwise redirect to login page
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        // check authorization
        if (localStorage.getItem('currentUser'))
        {
            // the user is logged so can proceed
            return true;
        }
        // the user is not logged, so redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        // cannot proceed
        return false;
    }
}
