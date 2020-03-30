import {Component, OnInit} from '@angular/core';
import {JobsListService} from '../services/jobs-list.service';
import {Job} from '../models/job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  job: Job;
  attachedImgs: HTMLElement;

  constructor(private jobsListService: JobsListService) { }

  ngOnInit() {
    this.jobsListService.jobId.subscribe(id => {
      if (id) {
        this.jobsListService.callGetJobByIdApi(id);
      }
    });
    this.jobsListService.job.subscribe(job => {
      this.job = job;
      if (job) {
        this.calculateHeightForScrollableDiv();
      }
    });
  }

  //
  private calculateHeightForScrollableDiv(): void {
    setTimeout(() => {
      if (!this.attachedImgs) {
        this.attachedImgs = document.getElementById('attachedImgs');
      }
      const jobHeader = document.getElementById('jobHeader').offsetHeight;
      const jobInfo = document.getElementById('jobInfo').offsetHeight;
      const jobDesc = document.getElementById('jobDesc').offsetHeight;
      const winHeight = window.innerHeight;
      const attachedImgsHeight = winHeight - 185 - jobHeader - jobInfo - jobDesc; // 185 - header heights + margins + title
      this.attachedImgs.style.height = attachedImgsHeight.toString() + 'px';
    }, 0);
  }

}
