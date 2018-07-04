import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { MockBackendService } from './mock-backend.service';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
        NavMenuComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        InMemoryWebApiModule.forRoot(MockBackendService),
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent, 
        NavMenuComponent,
    ],
})
export class AppModule { }
