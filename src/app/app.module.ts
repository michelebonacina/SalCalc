import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';        // uncomment for mock test service
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ROUTING} from './app.routing';

import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
// import { MockBackendService } from './services/mock-backend.service';    // uncomment for mock test service
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
    declarations: [
        HomeComponent,
        PersonComponent,
        NavMenuComponent,
        PersonDetailsComponent,
        RootComponent,
        LoginComponent,
        AlertComponent,
        UserComponent,
        UserDetailsComponent,
    ],
    imports: [
        BrowserModule,
        ROUTING,        
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        // InMemoryWebApiModule.forRoot(MockBackendService),        // uncomment for mock test service
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [
        RootComponent
    ],
})
export class AppModule { }
