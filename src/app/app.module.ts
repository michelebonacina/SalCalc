import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { MockBackendService } from './mock-backend.service';

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(MockBackendService),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
