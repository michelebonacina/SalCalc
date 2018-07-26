import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AlertService
{
    private subject: Subject<any> = new Subject<any>();     // observable alert's subject
    private keepAfterNavigationChange: boolean = false;     // keep message after a single location change (true) or not (false)

    //create a new alert service
    constructor(private router: Router) 
    {
        // clear alert message on route change
        this.router.events.subscribe(
            (event) =>
            {
                // check event's type
                if (event instanceof NavigationStart)
                {
                    // it's a navigation event
                    if (this.keepAfterNavigationChange)
                    {
                        // keep only a single location change
                        this.keepAfterNavigationChange = false
                    }
                    else 
                    {
                        // clear alert
                        this.subject.next();
                    }
                }
            }
        );
    }

    // show a successful message
    success(message: string, keepAfterNavigationChange: boolean = false)
    {
        // register a successful message
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    // show an error message
    error(message: string, keepAfterNavigationChange: boolean = false)
    {
        // register an error message
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }

    // return message
    getMessage(): Observable<any>
    {
        return this.subject.asObservable();
    }

}
