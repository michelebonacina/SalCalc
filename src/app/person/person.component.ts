import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash, faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { Person, PersonsService } from '../persons.service';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit
{
    @Input("persons") persons: Person[];
    @Input("personsService") personsService: PersonsService;
    personForm: FormGroup;
    faTrash = faTrash;
    faAddressCard = faAddressCard;
    showNewPersonForm: boolean = false;

    constructor(formBuilder: FormBuilder,
        private element: ElementRef
    ) 
    {
        this.personForm = formBuilder.group({
            'surname': [null, Validators.required],
            'name': [null, Validators.required],
            'birthdate': [null],
        });
    }

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

    // shows person form
    // hides add button and shows person form, focusing surname field 
    private showPersonForm()
    {
        // resets form
        this.personForm.reset();
        // shows person form
        this.showNewPersonForm = true;
    }

    // hides person form
    // hides person form and shows add button
    private hidePersonForm()
    {
        // resets form
        this.personForm.reset();
        // shows person form
        this.showNewPersonForm = false;
    }

    // cancels new person operation without saving
    cancelPersonForm(event: any)
    {
        // hide person form
        this.hidePersonForm();
        // stops standard submit operation
        event.preventDefault();
    }

    // prepares new person
    preparePerson()
    {
        // show person form
        this.showPersonForm();
    }

    // shows/hides persons details
    showPersonDetails(event: any, person: Person)
    {
        // change details visibility status
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
            // the data are valid
            // create new person
            let person: Person = new Person();
            person.surname = this.personForm.controls["surname"].value;
            person.name = this.personForm.controls["name"].value;
            person.birthdate = this.personForm.controls["birthdate"].value;
            // adds person to list            
            this.personsService.addPerson(person);
            // hide person form
            this.hidePersonForm();
        }
    }

    // deletes a person
    // asks for confirmation and delete the person
    deletePerson(event: any, person: Person)
    {
        // hide person form
        this.hidePersonForm();
        if (confirm("Are you sure you want to delete " + person.surname + " " + person.name + "?"))
        {
            this.personsService.deletePerson(person);
        }
    }
}
