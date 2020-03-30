import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobsListService {

  public jobsList: BehaviorSubject<Array<Job>> = new BehaviorSubject([]);
  public jobId: BehaviorSubject<string> = new BehaviorSubject(undefined);
  public job: BehaviorSubject<Job> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { }

  public callGetJobsListApi(): void {
    this.getJobsList().subscribe(res => {
      this.jobsList.next(res.body);
      this.jobId.next(res.body[0].id);
    });
  }

  private getJobsList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic dXNlckBtYWlsLmNvbToxMjM0NS5jb20=`
      })
    };
    return from(this.http.get<any>('http://localhost:3000/jobs', httpOptions));
  }

  public changeId(jobId): void {
    this.jobId.next(jobId);
  }

  public callGetJobByIdApi(id): void {
    this.getJobById(id).subscribe(res => {
      this.job.next(res.body);
    });
  }

  private getJobById(id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic dXNlckBtYWlsLmNvbToxMjM0NS5jb20=`
      })
    };
    return from(this.http.get<any>('http://localhost:3000/jobs/' + id, httpOptions));
  }
}
