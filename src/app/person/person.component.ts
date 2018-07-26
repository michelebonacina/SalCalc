import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash, faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { Person } from '../_model';
import { PersonsService } from '../_services';


// defines component for person management
// - resetPersonForm: removes person's data from form field
// - cancelPersonForm: cancels person form without saving and hides form
// - preparePresonForm: prepares and shows person form
// - showPersonDetails: shows details of a selected person
// - createPerson: gets and checks person's data and creates in persistence
// - deletePerson: shows a confirm message and deletes a person
@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit
{
    @Input("persons") persons: Person[];                        // persons list
    @Input("personsService") personsService: PersonsService;    // persons persistence manager
    personForm: FormGroup;                                      // person's form
    faTrash = faTrash;                                          // trash icon
    faAddressCard = faAddressCard;                              // details icon
    showNewPersonForm: boolean = false;                         // identify person form visibility

    // creates a new person component
    constructor(formBuilder: FormBuilder,
        private element: ElementRef
    ) 
    {
        this.personForm = formBuilder.group(
            {
                'id': [null],
                'surname': [null, Validators.required],
                'name': [null, Validators.required],
                'birthdate': [null],
            }
        );
    }

    // runs on component startup
    ngOnInit()
    {
    }

    //
    // ## FORM OPERATIONS ##
    //

    // resets the form data
    resetPersonForm(event: any)
    {
        // resets form
        this.personForm.reset();
        // stops standard submit operation
        event.preventDefault();
    }

    // cancels new person operation without saving
    cancelPersonForm(event: any)
    {
        // resets form
        this.personForm.reset();
        // shows person form
        this.showNewPersonForm = false;
        // stops standard submit operation
        event.preventDefault();
    }

    // prepares new person
    preparePerson()
    {
        // resets form
        this.personForm.reset();
        // shows person form
        this.showNewPersonForm = true;
    }

    // shows person's details
    showPersonDetails(event: any, person: Person)
    {
        // changes details visibility status
        person.showDetails = !person.showDetails;
    }

    //
    // ## PERSON OPERATION ##
    //

    // adds new person
    createPerson(event: any)
    {
        if (this.personForm.valid)
        {
            // the datas are valid
            // creates new person
            let person: Person = new Person();
            person.surname = this.personForm.controls["surname"].value;
            person.name = this.personForm.controls["name"].value;
            person.birthdate = this.personForm.controls["birthdate"].value;
            // adds person to list            
            this.personsService.addPerson(person);
            // resets form
            this.personForm.reset();
            // shows person form
            this.showNewPersonForm = false;
        }
    }

    // deletes a person
    // asks for confirmation and deletes the person
    deletePerson(event: any, person: Person)
    {
        // resets form
        this.personForm.reset();
        // shows person form
        this.showNewPersonForm = false;
        if (confirm("Are you sure you want to delete " + person.surname + " " + person.name + "?"))
        {
            this.personsService.deletePerson(person);
        }
    }
}
