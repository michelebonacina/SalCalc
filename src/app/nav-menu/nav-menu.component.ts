import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { environment } from '../../environments';

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

    companyName: string;        // name of the company
    username: string;           // user connected

    constructor(
        private authenticationService: AuthenticationService,   // authentication service
        private router: Router                                  // navigation router
    ) { }

    ngOnInit() {
        this.companyName = environment.companyName;
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
     }

    // logout from application
    logout()
    {
        // call login service form logout
        this.authenticationService.logout();
        // go to login page
        this.router.navigate(['/index.html?page=login']);
    }

}
