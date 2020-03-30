import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { JobsListService } from './jobs-list.service';

describe('JobsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: JobsListService = TestBed.get(JobsListService);
    expect(service).toBeTruthy();
  });
});
