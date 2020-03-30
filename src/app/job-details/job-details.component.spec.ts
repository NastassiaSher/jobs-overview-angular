import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { JobDetailsComponent } from './job-details.component';
import { JobsListService } from '../services/jobs-list.service';
import {BehaviorSubject} from 'rxjs';
import {Job} from '../models/job.model';

class MockJobsListService {
  jobId: BehaviorSubject<string> = new BehaviorSubject(undefined);
  job: BehaviorSubject<Job> = new BehaviorSubject(undefined);
  callGetJobByIdApi() {}
}

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailsComponent ],
      providers: [
        {provide: JobsListService, useClass: MockJobsListService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call callGetJobByIdApi function', () => {
    const jobsListService = fixture.debugElement.injector.get(JobsListService);
    const callGetJobByIdApiSpy = spyOn(jobsListService, 'callGetJobByIdApi').and.callThrough();
    jobsListService.jobId.next('12345');
    expect(callGetJobByIdApiSpy).toHaveBeenCalled();
  });
});
