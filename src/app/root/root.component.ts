import { Component, OnInit } from '@angular/core';

// application root component
// this is the first component called by the application
// used for access and authorization management
@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
})
export class RootComponent implements OnInit
{

    // create a new component
    constructor() { }

    // run on component startup
    ngOnInit() { }

}
