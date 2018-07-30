import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';

import { Person } from '../_model';

//
// !!NOTE!! Use this service for mock testing. You can use only one persons-xx.service at time.
//

// define services available for persons management
// - getObservable: return persons observable for change events subscribing
// - getPersons: get persons and raise update event
@Injectable({
    providedIn: 'root'
})
export class PersonsService
{
    url: string = 'api/persons';                    // url for getting persons from backend
    persons: Person[];                              // persons list
    public personObservable: Observable<any>;       // async observable person
    observer: any;                                  // async observer instance

    // create a new persons service
    constructor(private http: Http)
    {
        // create the observable
        this.personObservable = new Observable(
            (observer) =>
            {
                // store observable instance 
                this.observer = observer;
                // get persons and raise update event
                this.getPersons();
            }
        );
    }

    // run on component startup
    ngOnInit() { }

    // return person observable
    getObservable()
    {
        return this.personObservable;
    }

    // get persons list
    // connect to backend and get persons list
    // after that, invoke observer for sending persons list to all subscribers
    getPersons()
    {
        // call backend and get response
        this.http
            .get(this.url)
            .toPromise()
            .then(
                (response) =>
                {
                    // get persons from backend response
                    this.persons = response.json();
                    // send update event to subscribers
                    this.observer.next(this.persons);
                }
            );
    }

    // add a person
    // connect to backend and add a person to persons list
    // after that, reload persons list
    addPerson(person: Person)
    {
        // post person to backend and gets response
        this.http
            .post(this.url, JSON.stringify(person))
            .toPromise()
            .then(
                (response) =>
                {
                    // get persons
                    this.getPersons();
                }
            );
    }

    // modifie a person
    // connect to backend and modifie person's data
    // after that, reload persons list
    modifyPerson(person: Person)
    {
        // post person to backend and get response
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

    // delete a person
    // connect to backend and delete a person from persons list
    // after thar, reload persons list
    deletePerson(person: Person)
    {
        // delete person from backend and get response
        this.http
            .delete(`${this.url}/${person.id}`)
            .toPromise()
            .then(
                (response) =>
                {
                    // get persons
                    this.getPersons();
                }
            );
    }

}
