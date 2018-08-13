import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Person } from '../_model';
import { PersonsService, AlertService } from '../_services';

// define component for person details management
// - cancelPersonForm: cancel person form without saving and hide form
// - modifyPersonForm: show person form with data
// - modifyPerson: get person data from form and update in persistence
// - showPersonDetails: shows details of a selected person
@Component({
    selector: 'app-person-details',
    templateUrl: './person-details.component.html',
    styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit
{
    @Input("person") person: Person;                            // person
    @Input("personsService") personsService: PersonsService;    // persons persistence manager
    personForm: FormGroup;                                      // person form
    showModifyPersonForm: boolean = false;                      // specify person modify form visibility

    // create a new person detail component
    constructor(
        formBuilder: FormBuilder,
        private element: ElementRef,
        private alertService: AlertService,
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

    // run on component startpu
    ngOnInit() { }

    //
    // ## FORM OPERATIONS ##
    //

    // cancel data from person form field and hides form
    cancelPersonForm(event, personForm)
    {
        // reset person's form
        this.personForm.reset();
        // hide modify form
        this.showModifyPersonForm = false;
    }

    // show modify person form filling fields with person data
    modifyPersonForm(event)
    {
        // update form fields with person data
        this.personForm.controls["id"].setValue(this.person.id);
        this.personForm.controls["surname"].setValue(this.person.surname);
        this.personForm.controls["name"].setValue(this.person.name);
        this.personForm.controls["birthdate"].setValue(this.person.birthdate);
        // show modify form
        this.showModifyPersonForm = true;
    }

    //
    // ## PERSON OPERATION ##
    //

    // get person data from form field and update in persistence
    // at the end, hide form
    modifyPerson(event, personForm)
    {
        if (this.personForm.valid)
        {
            // data are valid
            // create new person
            let person: Person = new Person();
            person.id = this.personForm.controls["id"].value;
            person.surname = this.personForm.controls["surname"].value;
            person.name = this.personForm.controls["name"].value;
            person.birthdate = this.personForm.controls["birthdate"].value;
            // add person to list            
            this.personsService
                .modifyPerson(person)
                .subscribe(
                    {
                        error: (error) =>
                        {
                            this.alertService.error(error);
                        },
                        complete: () =>
                        {
                            this.alertService.success("Person Updated!");
                        }
                    }
                );
            // hide modify form
            this.personForm.reset();
            this.showModifyPersonForm = false;
            // hide persons's details
            this.person.showDetails = false;
        }
    }

}
