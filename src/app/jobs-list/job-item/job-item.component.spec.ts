import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JobItemComponent} from './job-item.component';
import {EXPECTED_JOB} from '../../../assets/json-responses/consts_for_tests';


describe('JobItemComponent', () => {
  let component: JobItemComponent;
  let fixture: ComponentFixture<JobItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobItemComponent);
    component = fixture.componentInstance;
    component.job = EXPECTED_JOB;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
