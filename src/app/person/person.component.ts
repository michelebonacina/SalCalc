import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    // prepares new person
    preparePerson()
    {
        // resets form
        this.personForm.reset();
        // gets document root
        let document = this.element.nativeElement.ownerDocument;
        // hides add button
        document.getElementById("newPersonButton").className = "hide";
        // shows person insert form
        let newPersonDataElement = document.getElementById("newPersonData");
        newPersonDataElement.className = "show";
        newPersonDataElement.getElementsByTagName("input")[0].focus();
    }

    // adds new person
    createPerson(event: any)
    {
        if (this.personForm.valid)
        {
            // the data are valid
            // gets document root
            let document = this.element.nativeElement.ownerDocument;
            // shows add button
            document.getElementById("newPersonButton").className = "show";
            // hides person insert form
            document.getElementById("newPersonData").className = "hide";
            // create new person
            let person: Person = new Person();
            person.surname = this.personForm.controls["surname"].value;
            person.name = this.personForm.controls["name"].value;
            person.birthdate = this.personForm.controls["birthdate"].value;
            // adds person to list            
            this.personsService.addPerson(person);
        }
    }

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
        // shows add button
        document.getElementById("newPersonButton").className = "show";
        // hides person insert form
        document.getElementById("newPersonData").className = "hide";
        // stops standard submit operation
        event.preventDefault();
    }

}
