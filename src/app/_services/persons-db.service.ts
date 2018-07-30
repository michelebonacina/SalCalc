import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';

import { Person } from '../_model';
import { environment } from '../../environments/environment.prod';

//
// !!NOTE!! Use this service for db persistence. You can use only one persons-xx.service at time.
//

// define services available for persons management
// - getObservable: return persons observable for change events subscribing
// - getPersons: get persons list and raise an update event
@Injectable({ providedIn: 'root' })
export class PersonsService
{
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

    // manage promise error
    handleErrorPromise(error: Response | any)
    {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

    // get persons list
    // connect to backend and get persons list
    // after that, invokes observer for sending persons list to all subscribers
    getPersons()
    {
        // call backend and get response
        this.http
            .get(`${environment.apiUrl}/api/person/list`)
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
        // post person to backend and get response
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        var requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        requestOptions.withCredentials = true;
        this.http
            .post(`${environment.apiUrl}/api/person/create`, JSON.stringify(person), requestOptions)
            .toPromise()
            .then(
                (response) =>
                {
                    // get persons
                    this.getPersons();
                }
            )
            .catch(this.handleErrorPromise);
    }

    // modifie a person
    // connect to backend and modifie person's data
    // after that, reload persons list
    modifyPerson(person: Person)
    {
        // post person to backend and get response
        // post person to backend and get response
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        var requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        requestOptions.withCredentials = true;
        this.http
            .post(`${environment.apiUrl}/api/person/update/` + person.id, JSON.stringify(person), requestOptions)
            .toPromise()
            .then(
                (response) =>
                {
                    // gets persons
                    this.getPersons();
                }
            )
            .catch(this.handleErrorPromise);;
    }

    // delete a person
    // connect to backend and delete a person from persons list
    // after that, reload persons list
    deletePerson(person: Person)
    {
        // delete person from backend and get response
        this.http
            .delete(`${environment.apiUrl}/api/person/delete/` + person.id)
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
