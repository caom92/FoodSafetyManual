import { EventEmitter, Input, Output } from '@angular/core'

import { LogService } from '../../../services/log.service'

export interface LogListElement {
  report_id: number
  creation_date: string
  created_by: string
}

export abstract class SuperLogListComponent {  
  @Output() startLog = new EventEmitter<number | boolean>()
  @Input() suffix: string
  public logList: Array<LogListElement> = []

  constructor(private logService: LogService) {

  }

  public ngOnInit(): void {
    this.logService.listWaitingLogs(this.suffix).then(success => {
      this.logList = success
    }, error => {

    })
  }

  public onLogOpen(logID: number | boolean): void {
    if (logID === Number(logID)) {
      this.startLog.emit(logID)
    } else {
      this.startLog.emit(true)
    }
  }
}