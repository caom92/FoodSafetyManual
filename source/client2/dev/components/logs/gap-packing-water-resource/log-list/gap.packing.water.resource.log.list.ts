import { Component, Output, EventEmitter } from '@angular/core'
import { DefaultLocale, Language } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'

export interface LogListElement {
  report_id: number
  creation_date: string
  created_by: string
}

@Component({
  selector: 'gap-packing-water-resource-log-list',
  templateUrl: './gap.packing.water.resource.log.list.html'
})

export class GAPPackingWaterResourceLogList {
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @Output() startLog = new EventEmitter<number | boolean>()
  protected logList: Array<LogListElement> = []
  protected waitingLog: SuperWaiting = null
  private suffix: string = null

  constructor(protected logService: LogService, protected toasts: ToastsService) {

  }

  public ngOnInit(): void {
    this.suffix = 'gap-packing-water-resource'
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