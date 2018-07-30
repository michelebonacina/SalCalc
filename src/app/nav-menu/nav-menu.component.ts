import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

// navigation bar component
// manage side menu bar navigation
// - logout: logout from application
@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit
{

    constructor(
        private authenticationService: AuthenticationService,   // authentication service
        private router: Router                                  // navigation router
    ) { }

    ngOnInit() { }

    // logout from application
    logout()
    {
        // call login service form logout
        this.authenticationService.logout();
        // go to login page
        this.router.navigate(['/login']);
    }

}
