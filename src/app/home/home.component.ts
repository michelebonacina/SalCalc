import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// main app component
@Component({
    selector: 'app-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent
{
    title = 'SalCalc';                      // app title
    description = "Salary Calculator";      // app description
    page: String = "";

    // create a new app component
    constructor(private activatedRoute: ActivatedRoute) { }

    // run on component startup
    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) =>
            {
                this.page = params['page'];
            }
        );
     }
}
