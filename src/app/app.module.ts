import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobItemComponent } from './jobs-list/job-item/job-item.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockedDataService } from '../mocks/mocked-data-service';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    JobsListComponent,
    JobDetailsComponent,
    JobItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    InlineSVGModule,
    HttpClientModule,
    environment.mockBackend ? HttpClientInMemoryWebApiModule.forRoot(MockedDataService,
      {
        delay: 1000,
        passThruUnknownUrl: true,
      }) : [],
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
