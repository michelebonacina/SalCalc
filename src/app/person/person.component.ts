import { Component, OnInit, Input } from '@angular/core';
import { Person, PersonsService } from '../persons.service';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit
{

    @Input("person") person: Person;
    @Input("personsService") personsService: PersonsService;

    constructor() { }

    ngOnInit()
    {
    }

}
