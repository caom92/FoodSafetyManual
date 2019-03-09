import { EventEmitter, Input, Output } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { LogService } from '../../../services/log.service'
import { SuperWaiting } from '../super-logs/super.logs.waiting.interface'

export interface LogListElement {
  report_id: number
  creation_date: string
  created_by: string
}

export abstract class SuperLogListComponent {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @Output() startLog = new EventEmitter<number | boolean>()
  @Input() suffix: string
  protected logList: Array<LogListElement> = []
  protected waitingLog: SuperWaiting = null

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

  public onLogClose(): void {
    this.waitingLog = null
  }
}