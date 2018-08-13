import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Person, User } from '../_model';
import { environment } from '../../environments';

//
// !!NOTE!! Use this service for db persistence. You can use only one persons-xx.service at time.
//

// define services available for persons management
// - getObservable: return persons observable for change events subscribing
// - getPersons: get persons list and raise an update event
@Injectable({ providedIn: 'root' })
export class PersonsService
{
    public personObservable: Observable<any>;       // async observable person
    observer: any;                                  // async observer instance
    private httpOptions: any;                       // authorization token                                    


    // create a new persons service
    constructor(private httpClient: HttpClient) 
    {
        // get authenticated user
        var currentUser: User = JSON.parse(sessionStorage.getItem('currentUser'));
        // prepare the authorization token
        this.httpOptions =
            {
                headers: new HttpHeaders(
                    {
                        'Authorization': 'Basic ' + btoa(currentUser.username + ':' + currentUser.password),
                        'Content-Type': 'application/json'
                    }
                )
            };
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
    // after that, invokes observer for sending persons list to all subscribers
    getPersons()
    {
        // call backend and get response
        this.httpClient
            .get(`${environment.apiUrl}/api/person/list`, this.httpOptions)
            .subscribe(
                {
                    next: response =>
                    {
                        // send update event to subscribers
                        this.observer.next(response);
                    },
                    error: error =>
                    {
                        console.error(error.message || error);
                        this.observer.error(error.message || error);
                    }
                }
            );
    }

    // add a person
    // connect to backend and add a person to persons list
    // after that, reload persons list
    addPerson(person: Person): Observable<any>
    {
        // person observer for response managment
        var currentPersonObserver: any;
        var observable = new Observable(
            (observer) =>
            {
                currentPersonObserver = observer;
            }
        );
        // post person to backend and get response
        this.httpClient
            .post(`${environment.apiUrl}/api/person/create`, JSON.stringify(person), this.httpOptions)
            .subscribe(
                {
                    next: response =>
                    {
                        // get persons
                        this.getPersons();
                        currentPersonObserver.complete();
                    },
                    error: error =>
                    {
                        currentPersonObserver.error(error.message || error);
                    }
                }
            );
        return observable;
    }

    // modifie a person
    // connect to backend and modifie person's data
    // after that, reload persons list
    modifyPerson(person: Person): Observable<any>
    {
        // person observer for response managment
        var currentPersonObserver: any;
        var observable = new Observable(
            (observer) =>
            {
                currentPersonObserver = observer;
            }
        );
        // post person to backend and get response
        this.httpClient
            .post(`${environment.apiUrl}/api/person/update/` + person.id, JSON.stringify(person), this.httpOptions)
            .subscribe(
                {
                    next: response =>
                    {
                        // gets persons
                        this.getPersons();
                        currentPersonObserver.complete();
                    },
                    error: error =>
                    {
                        currentPersonObserver.error(error.message || error);
                    }
                }
            );
        return observable;
    }

    // delete a person
    // connect to backend and delete a person from persons list
    // after that, reload persons list
    deletePerson(person: Person): Observable<any>
    {
        // person observer for response managment
        var currentPersonObserver: any;
        var observable = new Observable(
            (observer) =>
            {
                currentPersonObserver = observer;
            }
        );
        // delete person from backend and get response
        this.httpClient
            .delete(`${environment.apiUrl}/api/person/delete/` + person.id, this.httpOptions)
            .subscribe(
                {
                    next: response =>
                    {
                        // get persons
                        this.getPersons();
                        currentPersonObserver.complete();
                    },
                    error: error =>
                    {
                        currentPersonObserver.error(error.message || error);
                    }
                }
            );
        return observable;
    }

}
