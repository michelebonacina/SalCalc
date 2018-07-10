import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Person, PersonsService } from '../persons.service';

@Component({
    selector: 'app-person-details',
    templateUrl: './person-details.component.html',
    styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit
{
    @Input("person") person: Person;
    @Input("personsService") personsService: PersonsService;
    personForm: FormGroup;
    modify: boolean = false;

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

    cancelPersonForm($event, personForm)
    {
        this.modify = !this.modify;
    }

    modifyPersonForm($event)
    {
        this.personForm.controls["surname"].setValue(this.person.surname);
        this.personForm.controls["name"].setValue(this.person.name);
        this.personForm.controls["birthdate"].setValue(this.person.birthdate);
        this.modify = !this.modify;
    }

}
