import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit
{

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit()
    {
    }

    logout()
    {
        console.log("LOGOUT");
        // call service login and wait for response
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
