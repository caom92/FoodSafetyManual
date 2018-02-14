import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'

@Component({
  selector: 'report-loader',
  templateUrl: '../templates/app.report.loader.component.html'
})

export class ReportLoader implements OnInit, OnDestroy {
  @Input()
  report: any = null

  @Input()
  activeReport: string = "any"

  showReport: boolean = false

  reportEvent: any = null

  hasEmail: boolean = false

  par: any = this

  constructor(private events: PubSubService) {
    this.reportEvent = this.events.$sub('reportEvent').subscribe((from) => {
      this.activeReport = from.activeReport;
    });
    /*events.subscribe("reportEvent", (activeReport, time) => {
        this.activeReport = activeReport
        console.log("reporte activo: " + activeReport)
    })*/
  }

  ngOnInit() {
    this.par = this
    console.log(this.report)
    console.log(this)
  }

  ngOnDestroy() {

  }

  openHTMLReport() {
    this.showReport = true
    this.events.$pub('reportEvent', { activeReport: this.report.report_id, time: Date.now() });
    /*this.events.publish('reportEvent', this.report.report_id, Date.now());*/
  }

  closeHTMLReport() {
    this.showReport = false
    this.events.$pub('reportEvent', { activeReport: "any", time: Date.now() });
    /*this.events.publish('reportEvent', "any", Date.now());*/
  }
}