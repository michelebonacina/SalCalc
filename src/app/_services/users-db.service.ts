import { Injectable } from '@angular/core';
import { User } from '../_model';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment.prod';

//
// !!NOTE!! Use this service for db persistence. You can use only one user-xx.service at time.
//

// define services available for users management
// - getObservable: return userss observable for change events subscribing
// - getUsers: get users list and raise an update event

@Injectable({ providedIn: 'root' })
export class UsersService
{
    users: User[];                              // users list
    public userObservable: Observable<any>;     // async observable user
    observer: any;                              // async observer instance

    // create a new users service
    constructor(private http: Http)
    {
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

    // manage promise error
    handleErrorPromise(error: Response | any)
    {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

    // get users list
    // connect to backend and get users list
    // after that, invoke observer for sending users list to all subscribers
    getUsers()
    {
        // call backend and gets response
        this.http
            .get(`${environment.apiUrl}/api/user/list`)
            .toPromise()
            .then(
                (response) =>
                {
                    // get users from backend response
                    this.users = response.json();
                    // send update event to subscribers
                    this.observer.next(this.users);
                }
            );
    }

    // add a user
    // connect to backend and add a user to users list
    // after that, reload users list
    addUser(user: User)
    {
        // post user to backend and get response
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        var requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        requestOptions.withCredentials = true;
        this.http
            .post(`${environment.apiUrl}/api/user/create`, JSON.stringify(user), requestOptions)
            .toPromise()
            .then(
                (response) =>
                {
                    // gets users
                    this.getUsers();
                }
            )
            .catch(this.handleErrorPromise);
    }

    // modifie a user
    // connect to backend and modifie user's data
    // after that, reload users list
    modifyUser(user: User)
    {
        // post user to backend and get response
        // post user to backend and get response
        var headers = new Headers();
        headers.append('content-type', 'application/json');
        var requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        requestOptions.withCredentials = true;
        this.http
            .post(`${environment.apiUrl}/api/user/update/` + user.username, JSON.stringify(user), requestOptions)
            .toPromise()
            .then(
                (response) =>
                {
                    // gets users
                    this.getUsers();
                }
            )
            .catch(this.handleErrorPromise);;
    }

    // delete a user
    // connect to backend and delete a user from users list
    // after thar, reloads users list
    deleteUser(user: User)
    {
        // delete user from backend and gets response
        this.http
            .delete(`${environment.apiUrl}/api/user/delete/` + user.id)
            .toPromise()
            .then(
                (response) =>
                {
                    // get users
                    this.getUsers();
                }
            );
    }
}
