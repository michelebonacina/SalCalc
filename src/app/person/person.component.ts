import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        // gets document root
        let document = this.element.nativeElement.ownerDocument;
        // hides add button
        document.getElementById("newPersonButton").className = "hide";
        // shows person insert form
        let newPersonDataElement = document.getElementById("newPersonData");
        newPersonDataElement.className = "show";
        newPersonDataElement.getElementsByTagName("input")[0].focus();

    }

    // hides person form
    // hides person form and shows add button
    private hidePersonForm()
    {
        // resets form
        this.personForm.reset();
        // gets document root
        let document = this.element.nativeElement.ownerDocument;
        // shows add button
        document.getElementById("newPersonButton").className = "show";
        // hides person insert form
        document.getElementById("newPersonData").className = "hide";
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
