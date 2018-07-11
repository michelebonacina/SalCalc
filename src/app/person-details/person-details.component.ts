import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Person, PersonsService } from '../persons.service';

// defines component for person details management
// - resetPersonForm: removes person's data from form field
// - cancelPersonForm: cancels person form without saving and hides form
// - preparePresonForm: prepares and shows person form
// - showPersonDetails: shows details of a selected person
// - createPerson: gets and checks person's data and creates in persistence
// - deletePerson: shows a confirm message and deletes a person
@Component({
    selector: 'app-person-details',
    templateUrl: './person-details.component.html',
    styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit
{
    @Input("person") person: Person;                            // person
    @Input("personsService") personsService: PersonsService;    // persons persistence manager
    personForm: FormGroup;                                      // person's form
    showModifyPersonForm: boolean = false;                      // specify person's modify form visibility

    // creates a new person details component
    constructor(formBuilder: FormBuilder,
        private element: ElementRef
    ) 
    {
        this.personForm = formBuilder.group({
            'id': [null],
            'surname': [null, Validators.required],
            'name': [null, Validators.required],
            'birthdate': [null],
        });
    }

    // runs on component startpu
    ngOnInit()
    {
    }

    //
    // ## FORM OPERATIONS ##
    //

    // cancels data from person's form fiels and hides form
    cancelPersonForm(event, personForm)
    {
        // resets person's form
        this.personForm.reset();
        // hides modify form
        this.showModifyPersonForm = false;
    }

    // shows modify person's form filling fields with person's data
    modifyPersonForm(event)
    {
        // updates form fields with person's data
        this.personForm.controls["id"].setValue(this.person.id);
        this.personForm.controls["surname"].setValue(this.person.surname);
        this.personForm.controls["name"].setValue(this.person.name);
        this.personForm.controls["birthdate"].setValue(this.person.birthdate);
        // shows modify form
        this.showModifyPersonForm = true;
    }

    //
    // ## PERSON OPERATION ##
    //

    // gets person's data from form fields and updates in persistence
    // at the end, hides form
    modifyPerson(event, personForm)
    {
        if (this.personForm.valid)
        {
            // the data are valid
            // creates new person
            let person: Person = new Person();
            person.id = this.personForm.controls["id"].value;
            person.surname = this.personForm.controls["surname"].value;
            person.name = this.personForm.controls["name"].value;
            person.birthdate = this.personForm.controls["birthdate"].value;
            // adds person to list            
            this.personsService.modifyPerson(person);
            // hide modify form
            this.personForm.reset();
            this.showModifyPersonForm = false;
            // hide persons's details
            this.person.showDetails = false;
        }
    }

}
