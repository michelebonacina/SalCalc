import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../_model';
import { UsersService } from '../_services';

// define component for user details management
// - resetUserForm: remove user data from form field
// - cancelUserForm: cancel user form without saving and hides form
// - preparePresonForm: prepare and show user form
// - showUserDetails: show details of a selected user
// - createUser: get and check user's data and create in persistence
// - deleteUser: show a confirm message and delete a user
@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit
{
    @Input("user") user: User;                            // user
    @Input("usersService") usersService: UsersService;    // users persistence manager
    userForm: FormGroup;                                      // user's form
    showModifyUserForm: boolean = false;                      // specify user's modify form visibility

    // creates a new user details component
    constructor(formBuilder: FormBuilder) 
    {
        this.userForm = formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        });
    }

    // runs on component startpu
    ngOnInit()
    {
    }

    //
    // ## FORM OPERATIONS ##
    //

    // cancels data from user's form fiels and hides form
    cancelUserForm(event, userForm)
    {
        // resets user's form
        this.userForm.reset();
        // hides modify form
        this.showModifyUserForm = false;
    }

    // shows modify user's form filling fields with user's data
    modifyUserForm(event)
    {
        // updates form fields with user's data
        this.userForm.controls["username"].setValue(this.user.username);
        this.userForm.controls["password"].setValue(this.user.password);
        // shows modify form
        this.showModifyUserForm = true;
    }

    //
    // ## PERSON OPERATION ##
    //

    // gets user's data from form fields and updates in persistence
    // at the end, hides form
    modifyUser(event, userForm)
    {
        if (this.userForm.valid)
        {
            // the data are valid
            // creates new user
            let user: User = new User();
            user.username = this.userForm.controls["username"].value;
            user.password = this.userForm.controls["password"].value;
            // adds user to list            
            this.usersService.modifyUser(user);
            // hide modify form
            this.userForm.reset();
            this.showModifyUserForm = false;
            // hide users's details
            this.user.showDetails = false;
        }
    }
}
