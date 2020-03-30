import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../models/job.model';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {

  @Input()
  job: Job;

  startDate: Date;
  endDate: Date;

  constructor() { }

  ngOnInit() {
    this.startDate = new Date(this.job.created_at);
    this.endDate = new Date(this.job.end_date);
  }

}
