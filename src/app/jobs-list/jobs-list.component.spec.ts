import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsListComponent } from './jobs-list.component';
import {BehaviorSubject} from 'rxjs';
import {Job} from '../models/job.model';
import {JobsListService} from '../services/jobs-list.service';
import {Component, Input} from '@angular/core';
import {EXPECTED_JOB} from '../../assets/json-responses/consts_for_tests';

class MockJobsListService {
  jobsList: BehaviorSubject<string> = new BehaviorSubject(undefined);
  job: BehaviorSubject<Job> = new BehaviorSubject(EXPECTED_JOB);
  callGetJobsListApi() {}
}

@Component({selector: 'app-job-item', template: ''})
class JobItemComponent {
  @Input() public job: Job;
}

describe('JobsListComponent', () => {
  let component: JobsListComponent;
  let fixture: ComponentFixture<JobsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsListComponent, JobItemComponent ],
      providers: [
        {provide: JobsListService, useClass: MockJobsListService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create app-jobs-list', () => {
    expect(component).toBeTruthy();
  });

  it('should app-job-item', () => {
    fixture.detectChanges();
    expect(document.getElementsByTagName('app-job-item')).toBeDefined();
  });
});
