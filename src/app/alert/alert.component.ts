import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../_services';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy
{

    private subscritpion: Subscription;     // subscription to observable messages
    message: any;                           // alert message

    // create a new alert component
    constructor(private alertService: AlertService) { }

    // run on component startup
    ngOnInit()
    {
        // subcribe to alert service
        this.subscritpion = this.alertService.getMessage().subscribe(
            (message) =>
            {
                // keep message when arrive
                this.message = message;
            }
        );
    }

    // run on component end
    ngOnDestroy()
    {
        // unsubcribe from alert service
        this.subscritpion.unsubscribe();
    }

}
