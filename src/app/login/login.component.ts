import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../_model';
import { AuthenticationService, AlertService } from '../_services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit
{

    loginForm: FormGroup;       // login form

    // create a new login component
    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router,
        private alertService: AlertService
    ) { }

    // run on component startup
    ngOnInit()
    {
        // define login form 
        this.loginForm = this.formBuilder.group(
            {
                username: [null, Validators.required],
                password: [null, Validators.required],
            }
        );
    }

    //
    // ## FORM OPERATIONS ##
    //

    // reset the form data
    resetLoginForm(event: any)
    {
        // reset form
        this.loginForm.reset();
        // clear error message
        this.alertService.clear();
        // stop standard submit operation
        event.preventDefault();
    }

    //
    // ## LOGIN OPERATION ##
    //

    // form submit
    // login to application
    onSubmit() 
    {
        // clear error message
        this.alertService.clear();
        // check login form
        if (this.loginForm.valid) 
        {
            // create login user
            var user = new User();
            user.username = this.loginForm.controls['username'].value;
            user.password = this.loginForm.controls['password'].value;
            // call service login and wait for response
            this.authenticationService.login(user).then(
                (user) =>
                {
                    this.router.navigate(['/']);
                },
                (error) =>
                {
                    // show error message
                    this.alertService.error("User unknown!");
                }
            );

        }
    }
}
