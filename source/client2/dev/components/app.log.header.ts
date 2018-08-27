import { Component, Input, OnInit } from '@angular/core'

import { DateTimeService } from '../services/app.time'

@Component({
  selector: 'log-header',
  templateUrl: '../templates/app.log.header.html'
})

export class LogHeaderComponent implements OnInit {
  @Input() log: any
  date: string = ''

  constructor(private timeService: DateTimeService) {

  }

  public ngOnInit(): void {
    this.date = this.timeService.getISODate(new Date())
  }

  username = localStorage.getItem('user_full_name')
}