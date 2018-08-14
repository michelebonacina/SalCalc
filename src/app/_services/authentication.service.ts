import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';

import { User } from '../_model';

// manages user authentication
// - login: check user credentials and login
// - logout: logout user
@Injectable({ providedIn: 'root' })
export class AuthenticationService
{

    // create a new user service
    constructor(private httpClient: HttpClient) { }

    // login user
    // call api for user authentication and on success store user in session
    login(user: User)
    {
        // call api login and get response
        return new Observable(
            (observer) =>
            {
                this.httpClient.post(
                    `${environment.apiUrl}/api/user/login`,
                    {
                        username: user.username,
                        password: user.password,
                    })
                    .subscribe(
                        {
                            next: response =>
                            {
                                // response ok
                                // create authenticated user
                                var currentUser = new User();
                                currentUser.id = response['id'];
                                currentUser.username = response['username'];
                                currentUser.password = response['password'];
                                currentUser.lastActionTimestamp = new Date().getTime();
                                // store authenticated user in session
                                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                                // raise events for subscribers
                                observer.next(currentUser);
                            },
                            error: error =>
                            {
                                // raise error for subscriber
                                observer.error(error);
                            },
                            complete: () =>
                            {
                                // raise complete for subscribers
                                observer.complete();
                            }
                        }
                    );
            }
        );
    }

    // logout user
    logout()
    {
        // remove stored user from session
        sessionStorage.removeItem('currentUser');
    }

}
