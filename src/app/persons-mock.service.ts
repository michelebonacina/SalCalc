import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';

import { Person } from './model/person';

//
// !!NOTE!! Use this service for mock testing. You can use only one persons-xx.service at time.
//

// defines services available for persons management
// - getObservable: returns persons observable for change events subscribing
// - getPersons: gets persons and raises update event
@Injectable({
    providedIn: 'root'
})
export class PersonsService
{
    url: string = 'api/persons';                    // url for getting persons from backend
    persons: Person[];                              // persons list
    public personObservable: Observable<any>;       // async observable person
    observer: any;                                  // async observer instance

    // creates a new persons service
    constructor(private http: Http)
    {
        // creates the observable
        this.personObservable = new Observable(
            (observer) =>
            {
                // stores observable instance 
                this.observer = observer;
                // gets persons and raises update event
                this.getPersons();
            }
        );
    }

    // runs on component startup
    ngOnInit() { }

    // returns person observable
    getObservable()
    {
        return this.personObservable;
    }

    // gets persons list
    // connects to backend and gets persons list
    // after that, invokes observer for sending persons list to all subscribers
    getPersons()
    {
        // calls backend and gets response
        this.http
            .get(this.url)
            .toPromise()
            .then(
                (response) =>
                {
                    // gets persons from backend response
                    this.persons = response.json();
                    // sends update event to subscribers
                    this.observer.next(this.persons);
                }
            );
    }

    // adds a person
    // connects to backend and adds a person to persons list
    // after that, reloads persons list
    addPerson(person: Person)
    {
        // posts person to backend and gets response
        this.http
            .post(this.url, JSON.stringify(person))
            .toPromise()
            .then(
                (response) =>
                {
                    // gets persons
                    this.getPersons();
                }
            );
    }

    // modifies a person
    // connects to backend and modifies person's data
    // after that, reloads persons list
    modifyPerson(person: Person)
    {
        // posts person to backend and gets response
        this.http
            .post(`${this.url}/${person.id}`, JSON.stringify(person))
            .toPromise()
            .then(
                (response) =>
                {
                    // gets persons
                    this.getPersons();
                }
            );
    }

    // deletes a person
    // connects to backend and deletes a person from persons list
    // after thar, reloads persons list
    deletePerson(person: Person)
    {
        // deletes person from backend and gets response
        this.http
            .delete(`${this.url}/${person.id}`)
            .toPromise()
            .then(
                (response) =>
                {
                    // gets persons
                    this.getPersons();
                }
            );
    }

}
