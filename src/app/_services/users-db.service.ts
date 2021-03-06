import { Injectable } from '@angular/core';
import { User } from '../_model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments';
import { throws } from 'assert';

//
// !!NOTE!! Use this service for db persistence. You can use only one user-xx.service at time.
//

// define services available for users management
// - getObservable: return userss observable for change events subscribing
// - getUsers: get users list and raise an update event
@Injectable({ providedIn: 'root' })
export class UsersService
{
    public userObservable: Observable<any>;     // async observable user
    observer: any;                              // async observer instance
    private httpOptions: any;                       // authorization token  

    // create a new users service
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
        this.userObservable = new Observable(
            (observer) =>
            {
                // store observable instance 
                this.observer = observer;
                // get users and raise update event
                this.getUsers();
            }
        );
    }

    // run on component startup
    ngOnInit() { }

    // return user observable
    getObservable()
    {
        return this.userObservable;
    }

    // get users list
    // connect to backend and get users list
    // after that, invoke observer for sending users list to all subscribers
    getUsers()
    {
        // call backend and gets response
        this.httpClient
            .get(`${environment.apiUrl}/api/user/list`, this.httpOptions)
            .subscribe(
                {
                    next: (response) =>
                    {
                        // get users from backend response
                        // send update event to subscribers
                        this.observer.next(response);
                    },
                    error: (error) =>
                    {
                        console.log(error.message || error);
                        this.observer.error(error.message || error);
                    }
                }
            );
    }

    // add a user
    // connect to backend and add a user to users list
    // after that, reload users list
    addUser(user: User): Observable<any>
    {
        // user observer for response managment
        var currentUserObserver: any;
        var observable = new Observable(
            (observer) =>
            {
                currentUserObserver = observer;
            }
        );
        // post user to backend and get response
        this.httpClient
            .post(`${environment.apiUrl}/api/user/create`, JSON.stringify(user), this.httpOptions)
            .subscribe(
                {
                    next: (response) =>
                    {
                        // gets users
                        this.getUsers();
                        currentUserObserver.complete();
                    },
                    error: (error) =>
                    {
                        currentUserObserver.error(error.message || error);
                    }
                }
            );
        return observable;
    }

    // modifie a user
    // connect to backend and modifie user's data
    // after that, reload users list
    modifyUser(user: User)
    {
        // user observer for response managment
        var currentUserObserver: any;
        var observable = new Observable(
            (observer) =>
            {
                currentUserObserver = observer;
            }
        );
        // post user to backend and get response
        this.httpClient
            .post(`${environment.apiUrl}/api/user/update/` + user.id, JSON.stringify(user), this.httpOptions)
            .subscribe(
                {
                    next: (response) =>
                    {
                        // gets users
                        this.getUsers();
                        currentUserObserver.complete();
                    },
                    error: (error) =>
                    {
                        currentUserObserver.error(error.message || error);
                    }
                }
            );
        return observable;
    }

    // change a user password
    // connect to backend and change password
    // after that, reload users list
    changeUserPassword(user: User)
    {
        // user observer for response managment
        var currentUserObserver: any;
        var observable = new Observable(
            (observer) =>
            {
                currentUserObserver = observer;
            }
        );
        // post user to backend and get response
        this.httpClient
            .post(`${environment.apiUrl}/api/user/changePassword/` + user.id, JSON.stringify(user), this.httpOptions)
            .subscribe(
                {
                    next: (response) =>
                    {
                        // gets users
                        this.getUsers();
                        currentUserObserver.complete();
                    },
                    error: (error) =>
                    {
                        currentUserObserver.error(error.message || error);
                    }
                }
            );
        return observable;
    }


    // delete a user
    // connect to backend and delete a user from users list
    // after thar, reloads users list
    deleteUser(user: User)
    {
        // user observer for response managment
        var currentUserObserver: any;
        var observable = new Observable(
            (observer) =>
            {
                currentUserObserver = observer;
            }
        );
        // delete user from backend and gets response
        this.httpClient
            .delete(`${environment.apiUrl}/api/user/delete/` + user.id, this.httpOptions)
            .subscribe(
                {
                    next: (response) =>
                    {
                        // get users
                        this.getUsers();
                        currentUserObserver.complete();
                    },
                    error: (error) =>
                    {
                        currentUserObserver.error(error.message || error);
                    }
                }
            );
        return observable;
    }
}
