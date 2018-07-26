import { Injectable } from '@angular/core';
import { User } from '../_model';
import { Http } from '@angular/http';
import { environment } from '../../environments';

@Injectable({ providedIn: 'root' })
export class AuthenticationService
{

    // create a new user service
    constructor(private http: Http) 
    {
    }

    // login user
    login(user: User)
    {
        // call api login and get response
        return this.http.post(
            `${environment.apiUrl}/api/user/login`,
            {
                username: user.username,
                password: user.password,
            })
            .toPromise()
            .then(
                (response) =>
                {
                    // get user from response
                    var responseUser = response.json();
                    // create authenticated user
                    var currentUser = new User();
                    currentUser.username = responseUser.username;
                    currentUser.password = responseUser.password;
                    // store authenticated user in session
                    localStorage.setItem('currentUser', JSON.stringify(currentUser))
                    // return authenticated user
                    return currentUser;
                })
            .catch(
                (error) =>
                {
                    console.log("Authentication error");
                }
            );
    }

    // logout user
    logout()
    {
        // remove stored user from session
        localStorage.removeItem('currentUser');
    }
}
