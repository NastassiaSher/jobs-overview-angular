import { Component, OnInit } from '@angular/core';
import {JobsListService} from '../services/jobs-list.service';
import {Job} from '../models/job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  jobsList: [Job];

  constructor(private jobsListService: JobsListService) { }

  ngOnInit() {
    this.jobsListService.callGetJobsListApi();
    this.jobsListService.jobsList.subscribe((jobs) => {
      if (jobs) {
        const activeJobs = this.selectActiveJobs(jobs);
        this.addPropertyActive(activeJobs);
        this.jobsList = activeJobs;
      }
    });
  }

  private selectActiveJobs(jobs): [Job] {
    return jobs.filter(item => item.state === 'active');
  }

  private addPropertyActive(jobs): void {
    for (let i = 0; i < jobs.length; i++) {
      i === 0 ? jobs[i].active = true : jobs[i].active = false;
    }
  }

  selectedJobChanged(id, index): void {
    this.jobsListService.changeId(id);
    this.changeActiveJob(index);
  }

  changeActiveJob(index): void {
    for (let i = 0; i < this.jobsList.length; i++) {
      i === index ? this.jobsList[i].active = true : this.jobsList[i].active = false;
    }
  }

}
