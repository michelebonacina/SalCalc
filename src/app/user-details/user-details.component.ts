import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../_model';
import { UsersService } from '../_services';

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
    userForm: FormGroup;                                    // user's form
    showModifyUserForm: boolean = false;                    // specify user's modify form visibility

    // create a new user details component
    constructor(formBuilder: FormBuilder) 
    {
        this.userForm = formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        });
    }

    // run on component startpu
    ngOnInit()
    {
    }

    //
    // ## FORM OPERATIONS ##
    //

    // cancel data from user's form fiels and hides form
    cancelUserForm(event, userForm)
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
        this.userForm.controls["username"].setValue(this.user.username);
        this.userForm.controls["password"].setValue(this.user.password);
        // show modify form
        this.showModifyUserForm = true;
    }

    //
    // ## PERSON OPERATION ##
    //

    // get user data from form fields and update in persistence
    // at the end, hide form
    modifyUser(event, userForm)
    {
        if (this.userForm.valid)
        {
            // data are valid
            // create new user
            let user: User = new User();
            user.username = this.userForm.controls["username"].value;
            user.password = this.userForm.controls["password"].value;
            // add user to list            
            this.usersService.modifyUser(user);
            // hide modify form
            this.userForm.reset();
            this.showModifyUserForm = false;
            // hide users's details
            this.user.showDetails = false;
        }
    }
}
