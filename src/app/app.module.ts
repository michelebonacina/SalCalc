import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';     // uncomment for mock test service
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
// import { MockBackendService } from './services/mock-backend.service';     // uncomment for mock test service
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

@NgModule({
    declarations: [
        HomeComponent,
        PersonComponent,
        NavMenuComponent,
        PersonDetailsComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        // InMemoryWebApiModule.forRoot(MockBackendService),        // uncomment for mock test service
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [
        HomeComponent, 
        NavMenuComponent,
    ],
})
export class AppModule { }
