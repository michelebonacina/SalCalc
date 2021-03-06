import { Component, OnInit, Input } from '@angular/core';
import { User } from '../_model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faTrash, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { UsersService } from '../_services';
import { AlertService } from '../_services';

// define component for user management
// - resetUserForm: remove user data from form field
// - cancelUserForm: cancel user form without saving and hide form
// - preparePersonForm: prepare and show user form
// - showUserDetails: shows details of a selected user
// - createUser: get and check user data and store in persistence
// - deleteUser: show a confirm message and delete a user
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [UsersService]
})
export class UserComponent implements OnInit
{
    users: User[];                          // users list
    userForm: FormGroup;                    // user form
    faTrash = faTrash;                      // trash icon
    faAddressCard = faAddressCard;          // details icon
    showNewUserForm: boolean = false;       // identify user form visibility
    usersObservable: Observable<any>;       // observable person for getting changes

    // create a new user component
    constructor(
        private formBuilder: FormBuilder,
        public usersService: UsersService,
        private alertService: AlertService,
    )
    {
        this.users = [];
    }

    // run on component startup
    ngOnInit()
    {
        // prepare user form
        this.userForm = this.formBuilder.group(
            {
                'username': [null, Validators.required],
                'password': [null, Validators.required],
                'name': [null, Validators.required],
                'surname': [null, Validators.required],
            }
        );
        // get observable user from user service
        this.usersObservable = this.usersService.getObservable();
        // subscribe to observable for getting person changes
        this.usersObservable.subscribe(
            {
                next: (users) => 
                {
                    // get persons list from observable
                    this.users = users;
                },
                error: (error) =>
                {
                    this.alertService.error(error);
                }
            }
        );
    }

    //
    // ## FORM OPERATIONS ##
    //

    // reset the form data
    resetUserForm(event: any)
    {
        // reset form
        this.userForm.reset();
        // stop standard submit operation
        event.preventDefault();
    }

    // cancel new user operation without saving
    cancelUserForm(event: any)
    {
        // reset form
        this.userForm.reset();
        // show user form
        this.showNewUserForm = false;
        // stop standard submit operation
        event.preventDefault();
    }

    // prepare new user
    prepareUser()
    {
        // reset form
        this.userForm.reset();
        // show user form
        this.showNewUserForm = true;
    }

    // show user details
    showUserDetails(event: any, user: User)
    {
        // change details visibility status
        user.showDetails = !user.showDetails;
    }

    //
    // ## USER OPERATION ##
    //

    // add new user
    createUser(event: any)
    {
        if (this.userForm.valid)
        {
            // the datas are valid
            // create new user
            let user: User = new User();
            user.username = this.userForm.controls["username"].value;
            user.password = this.userForm.controls["password"].value;
            user.surname = this.userForm.controls["surname"].value;
            user.name = this.userForm.controls["name"].value;
            // add user to list            
            this.usersService
                .addUser(user)
                .subscribe(
                    {
                        error: error =>
                        {
                            this.alertService.error(error);
                        },
                        complete: () =>
                        {
                            this.alertService.success("User created!");
                        }
                    }
                );
            // reset form
            this.userForm.reset();
            // show user form
            this.showNewUserForm = false;
        }
    }

    // delete a user
    // ask for confirmation and delete the user
    deleteUser(event: any, user: User)
    {
        // reset form
        this.userForm.reset();
        // show user form
        this.showNewUserForm = false;
        if (confirm("Are you sure you want to delete " + user.username + "?"))
        {
            // delete user
            this.usersService
                .deleteUser(user)
                .subscribe(
                    {
                        error: (error) =>
                        {
                            this.alertService.error(error);
                        },
                        complete: () =>
                        {
                            this.alertService.success("User Deleted!");
                        }
                    }
                );
        }
    }

}

