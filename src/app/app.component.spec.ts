import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component} from '@angular/core';

@Component({selector: 'app-header', template: ''})
class HeaderComponent {}

@Component({selector: 'app-jobs-list', template: ''})
class JobsListComponent {}

@Component({selector: 'app-job-details', template: ''})
class JobDetailsComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        JobsListComponent,
        JobDetailsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });

  it(`should have as title 'jobs-overview'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('jobs-overview');
  });

  it('should create app-header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.getElementsByTagName('app-header')).toBeDefined();
  });

  it('should create component app-jobs-list', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.getElementsByTagName('app-jobs-list')).toBeDefined();
  });

  it('should create component app-job-details', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(document.getElementsByTagName('app-job-details')).toBeDefined();
  });
});
