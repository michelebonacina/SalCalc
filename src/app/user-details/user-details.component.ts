import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { User } from '../_model';
import { UsersService, AlertService } from '../_services';

// define component for user details management
// - cancelUserForm: cancel user form without saving and hides form
// - modifyUserForm: show user form with data
// - modifyUser: get user data from form and update persistence
@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit
{
    @Input("user") user: User;                              // user
    @Input("usersService") usersService: UsersService;      // users persistence manager
    userForm: FormGroup;                                    // user form
    userPasswordForm: FormGroup;                            // user change password form
    showModifyUserForm: boolean = false;                    // specify user's modify form visibility
    showChangeUserPasswordForm: boolean = false;            // specify user's modify form visibility


    // create a new user details component
    constructor(
        formBuilder: FormBuilder,
        private alertService: AlertService
    ) 
    {
        // define the user form
        this.userForm = formBuilder.group({
            'id': [null, Validators.required],
            'username': [null, Validators.required],
            'surname': [null, Validators.required],
            'name': [null, Validators.required],
        });
        // define the change password form
        this.userPasswordForm = formBuilder.group(
            {
                'id': [null, Validators.required],
                'password': [null, Validators.required],
                'password2': [null, Validators.required],
            },
            {
                validator: checkPasswordValidator
            }
        );
    }

    // run on component startpu
    ngOnInit()
    {
    }

    //
    // ## FORM OPERATIONS ##
    //

    // cancel data from user's form fiels and hides form
    cancelUserForm(event)
    {
        // reset user form
        this.userForm.reset();
        // hide modify form
        this.showModifyUserForm = false;
    }

    // show modify user form filling fields with user data
    modifyUserForm(event)
    {
        // update form fields with user data
        this.userForm.controls["id"].setValue(this.user.id);
        this.userForm.controls["username"].setValue(this.user.username);
        this.userForm.controls["surname"].setValue(this.user.surname);
        this.userForm.controls["name"].setValue(this.user.name);
        // show modify form
        this.showModifyUserForm = true;
    }

    // show change user password form
    changeUserPasswordForm(event)
    {
        // update form fields with user data
        this.userPasswordForm.controls["id"].setValue(this.user.id);
        this.userPasswordForm.controls["password"].setValue('');
        this.userPasswordForm.controls["password2"].setValue('');
        // show modify form
        this.showChangeUserPasswordForm = true;
    }

    // cancel data from user password form fiels and hides form
    cancelUserPasswordForm(event)
    {
        // reset user form
        this.userPasswordForm.reset();
        // hide modify form
        this.showChangeUserPasswordForm = false;
    }


    //
    // ## PERSON OPERATION ##
    //

    // get user data from form fields and update in persistence
    // at the end, hide form
    modifyUser(event)
    {
        if (this.userForm.valid)
        {
            // data are valid
            // create new user
            let user: User = new User();
            user.id = this.userForm.controls["id"].value;
            user.username = this.userForm.controls["username"].value;
            user.surname = this.userForm.controls["surname"].value;
            user.name = this.userForm.controls["name"].value;
            // add user to list            
            this.usersService
                .modifyUser(user)
                .subscribe(
                    {
                        error: (error) =>
                        {
                            this.alertService.error(error);
                        },
                        complete: () =>
                        {
                            this.alertService.success("User Modified!");
                        }
                    }
                );
            // hide modify form
            this.userForm.reset();
            this.showModifyUserForm = false;
            // hide users's details
            this.user.showDetails = false;
        }
    }

    // get user data from form fields and update in persistence
    // at the end, hide form
    changeUserPassword(event)
    {
        if (this.userPasswordForm.valid)
        {
            // data are valid
            // create new user
            let user: User = new User();
            user.id = this.userPasswordForm.controls["id"].value;
            user.password = this.userPasswordForm.controls["password"].value;
            // add user to list            
            this.usersService
                .changeUserPassword(user)
                .subscribe(
                    {
                        error: (error) =>
                        {
                            this.alertService.error(error);
                        },
                        complete: () =>
                        {
                            this.alertService.success("Password Changed!");
                        }
                    }
                );
            // hide modify form
            this.userPasswordForm.reset();
            this.showModifyUserForm = false;
            // hide users's details
            this.user.showDetails = false;
        }
    }

}

// validator for password repeat testing
const checkPasswordValidator: ValidatorFn =
    (control: FormGroup): ValidationErrors | null =>
    {
        // get first pasword
        const password = control.get('password').value;
        // get second password
        const password2 = control.get('password2').value;
        // check if passwords are equals
        return password && password2 && password === password2 ? null : { 'passwordNotMatch': true };
    };

    