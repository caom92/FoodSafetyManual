import { OnDestroy, OnInit } from '@angular/core'
import { Events } from 'ionic-angular'

import { SuperReportInterface } from './super.report.interface'

export class SuperReportLoader implements OnInit, OnDestroy {
  protected report: SuperReportInterface = null
  protected activeReport: string = "any"
  protected lang: string
  protected showReport: boolean = false

  constructor(protected events: Events) {

  }

  public ngOnInit(): void {
    this.events.subscribe("reportEvent", (activeReport, time) => {
      this.activeReport = activeReport
    })
  }

  public ngOnDestroy(): void {
    this.events.unsubscribe("reportEvent", () => {
      console.log("Report Event unsubscribed")
    })
  }

  public openHTMLReport(): void {
    this.showReport = true
    this.events.publish('reportEvent', this.report.report_id, Date.now())
  }

  public closeHTMLReport(): void {
    this.showReport = false
    this.events.publish('reportEvent', "any", Date.now())
  }
}