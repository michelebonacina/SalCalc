import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';

// defines a person
export class Person
{
    id: number;         // persons unique indentifier   
    name: string;       // person's name
    surname: string;    // person's surname
    birthdate: Date;    // person's date of birth
}

// defines services available for persons management
// - getObservable: returns persons observable for change events subscribing
// - getPersons: gets persons and raise update event
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
                // gets persons and raise update event
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
    // connect to backend and gets list of persons
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
                    // send update event to subscribers
                    this.observer.next(this.persons);
                }
            );
    }

    // adds a person
    // connect to backend and adds a person to persons list
    // after that, reload persons list
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

    // deletes a person
    // connect to backend and deleted a person from persons list
    // after thar, reload persons list
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
