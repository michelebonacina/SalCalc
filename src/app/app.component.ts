import { Component } from '@angular/core';
import { Observable } from 'rxjs/observable';

import { PersonsService } from './persons.service';
import { Person } from './model/person';

// main app component
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [PersonsService]
})
export class AppComponent
{
    title = 'SalCalc';                      // app title
    description = "Salary Calculator";      // app description
    personsObservable: Observable<any>;     // observable person for getting changes
    persons: Person[];                      // persons list

    // creates a new app component
    constructor(public personsService: PersonsService)
    {
        // reset persons list
        this.persons = [];
    }

    // runs on component startup
    ngOnInit()
    {
        // gets observable person from person service
        this.personsObservable = this.personsService.getObservable();
        // subscribes to observable for getting person changes
        this.personsObservable.subscribe(
            (persons) => 
            {
                // gets persons list from observable
                this.persons = persons;
            }
        )
    }
}
