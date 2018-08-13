import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Person } from '../_model';
import { PersonsService, AlertService } from '../_services';


// define component for person management
// - resetPersonForm: remove person's data from form field
// - cancelPersonForm: cancel person form without saving and hide form
// - preparePresonForm: prepare and show person form
// - showPersonDetails: show details of a selected person
// - createPerson: get and check person's data and create in persistence
// - deletePerson: show a confirm message and delete a person
@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit
{
    persons: Person[];                      // person list
    personForm: FormGroup;                  // person form
    faTrash = faTrash;                      // trash icon
    faAddressCard = faAddressCard;          // detail icon
    showNewPersonForm: boolean = false;     // identify person form visibility
    personsObservable: Observable<any>;     // observable person for getting changes

    // create a new person component
    constructor(
        private formBuilder: FormBuilder, 
        private personsService: PersonsService,
        private alertService: AlertService,
    )
    {
        // initialize persons list
        this.persons = [];
    }

    // run on component startup
    ngOnInit()
    {
        this.personForm = this.formBuilder.group(
            {
                'id': [null],
                'surname': [null, Validators.required],
                'name': [null, Validators.required],
                'birthdate': [null],
            }
        );
        // get observable person from person service
        this.personsObservable = this.personsService.getObservable();
        // subscribe to observable for getting person changes
        this.personsObservable.subscribe(
            {
            next: persons => 
            {
                // get persons list from observable
                this.persons = persons;
            },
            error: error =>
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
    resetPersonForm(event: any)
    {
        // reset form
        this.personForm.reset();
        // stop standard submit operation
        event.preventDefault();
    }

    // cancel new person operation without saving
    cancelPersonForm(event: any)
    {
        // reset form
        this.personForm.reset();
        // show person form
        this.showNewPersonForm = false;
        // stop standard submit operation
        event.preventDefault();
    }

    // prepare new person
    preparePerson()
    {
        // reset form
        this.personForm.reset();
        // show person form
        this.showNewPersonForm = true;
    }

    // show person's details
    showPersonDetails(event: any, person: Person)
    {
        // change details visibility status
        person.showDetails = !person.showDetails;
    }

    //
    // ## PERSON OPERATION ##
    //

    // add new person
    createPerson(event: any)
    {
        if (this.personForm.valid)
        {
            // data are valid
            // create new person
            let person: Person = new Person();
            person.surname = this.personForm.controls["surname"].value;
            person.name = this.personForm.controls["name"].value;
            person.birthdate = this.personForm.controls["birthdate"].value;
            // add person to list            
            this.personsService.addPerson(person);
            // reset form
            this.personForm.reset();
            // show person form
            this.showNewPersonForm = false;
        }
    }

    // delete a person
    // ask for confirmation and delete the person
    deletePerson(event: any, person: Person)
    {
        // reset form
        this.personForm.reset();
        // hide person form
        this.showNewPersonForm = false;
        // ask for confirmation and delete person
        if (confirm("Are you sure you want to delete " + person.surname + " " + person.name + "?"))
        {
            // delete person
            this.personsService.deletePerson(person);
        }
    }
}
