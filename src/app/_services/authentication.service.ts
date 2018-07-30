import { Injectable } from '@angular/core';
import { User } from '../_model';
import { Http } from '@angular/http';
import { environment } from '../../environments';

// manages user authentication
// - login: check user credentials and login
// - logout: logout user
@Injectable({ providedIn: 'root' })
export class AuthenticationService
{

    // create a new user service
    constructor(private http: Http) { }

    // login user
    // call api for user authentication and on success store user in session
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
                    // response ok
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
    }

    // logout user
    logout()
    {
        // remove stored user from session
        localStorage.removeItem('currentUser');
    }

}
