import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ComponentRef } from '@angular/core'
import { Language, TranslationService as TS } from 'angular-l10n'
import { PubSubService } from 'angular2-pubsub'
import { Subscription } from 'rxjs/Subscription'

import { GAPOthersUnusualOccurrenceReportComponent } from '../gap-others-unusual-occurrence/report/gap.others.unusual.occurrence.report'
import { GAPPackingPreopReportComponent } from '../gap-packing-preop/report/gap.packing.preop.report'
import { GMPDocControlDocControlReportComponent } from '../gmp-doc-control-doc-control/report/gmp.doc.control.doc.control.report'
import { GMPOthersUnusualOccurrenceReportComponent } from '../gmp-others-unusual-occurrence/report/gmp.others.unusual.occurrence.report'
import { GMPPackingAgedProductReportComponent } from '../gmp-packing-aged-product/report/gmp.packing.aged.product.report'
import { GMPPackingATPTestingReportComponent } from '../gmp-packing-atp-testing/report/gmp.packing.atp.testing.report'
import { GMPPackingColdRoomTempReportComponent } from '../gmp-packing-cold-room-temp/report/gmp.packing.cold.room.temp.report'
import { GMPPackingFinishedProductReportComponent } from '../gmp-packing-finished-product/report/gmp.packing.finished.product.report'
import { GMPPackingGlassBrittleReportComponent } from '../gmp-packing-glass-brittle/report/gmp.packing.glass.brittle.report'
import { GMPPackingHandWashingReportComponent } from '../gmp-packing-hand-washing/report/gmp.packing.hand.washing.report'
import { GMPPackingPreopReportComponent } from '../gmp-packing-preop/report/gmp.packing.preop.report'
import { GMPPackingScaleCalibrationReportComponent } from '../gmp-packing-scale-calibration/report/gmp.packing.scale.calibration.report'
import { GMPPackingScissorsKnivesReportComponent } from '../gmp-packing-scissors-knives/report/gmp.packing.scissors.knives.report'
import { GMPPackingThermoCalibrationReportComponent } from '../gmp-packing-thermo-calibration/report/gmp.packing.thermo.calibration.report'
import { GMPSelfInspectionPestControlReportComponent } from '../gmp-self-inspection-pest-control/report/gmp.self.inspection.pest.control.report'
import { ReportRequest } from '../reports.interface'
import { SuperReportComponent } from '../super-report/super.report'
import { SuperReportInterface } from '../super-report/super.report.interface'
import { DynamicComponentResolver } from './../../dynamic.resolver'
import { Preview } from '../preview/report.preview.interface';

@Component({
  selector: 'report-loader',
  templateUrl: './report.loader.html'
})

export class ReportLoader extends DynamicComponentResolver implements OnInit, OnDestroy {
  @Input() private report: SuperReportInterface = null
  @Input() private activeReport: string = "any"
  @Input() private suffix: string
  @Input() private footer: string
  @Language() private lang: string
  private showReport: boolean = false
  private loaderComponent: SuperReportComponent = null
  private pdfReport: ReportRequest = {
    lang: null,
    content: null,
    style: null,
    company: null,
    address: null,
    logo: null,
    orientation: null,
    footer: null,
    supervisor: null,
    signature: null
  }
  private readonly reportComponents = {
    "gap-others-unusual-occurrence": GAPOthersUnusualOccurrenceReportComponent,
    "gap-packing-preop": GAPPackingPreopReportComponent,
    "gmp-doc-control-doc-control": GMPDocControlDocControlReportComponent,
    "gmp-others-unusual-occurrence": GMPOthersUnusualOccurrenceReportComponent,
    "gmp-packing-aged-product": GMPPackingAgedProductReportComponent,
    "gmp-packing-atp-testing": GMPPackingATPTestingReportComponent,
    "gmp-packing-cold-room-temp": GMPPackingColdRoomTempReportComponent,
    "gmp-packing-finished-product": GMPPackingFinishedProductReportComponent,
    "gmp-packing-glass-brittle": GMPPackingGlassBrittleReportComponent,
    "gmp-packing-hand-washing": GMPPackingHandWashingReportComponent,
    "gmp-packing-preop": GMPPackingPreopReportComponent,
    "gmp-packing-scale-calibration": GMPPackingScaleCalibrationReportComponent,
    "gmp-packing-scissors-knives": GMPPackingScissorsKnivesReportComponent,
    "gmp-packing-thermo-calibration": GMPPackingThermoCalibrationReportComponent,
    "gmp-self-inspection-pest-control": GMPSelfInspectionPestControlReportComponent
  }
  reportEvent: Subscription
  preview: Array<Preview> = null

  constructor(factoryResolver: ComponentFactoryResolver, private events: PubSubService, private ts: TS) {
    super(factoryResolver)
  }

  public ngOnInit(): void {
    this.reportEvent = this.events.$sub("reportEvent", (activeReport) => {
      this.activeReport = activeReport.activeReport
    })

    if (this.reportComponents[this.suffix] != undefined && this.reportComponents[this.suffix] != null) {
      this.loaderComponent = this.loadComponent(this.reportComponents[this.suffix], {
        report: this.report,
        parent: this
      }).instance
      this.preview = this.loaderComponent.getPreview()
    }
  }

  public printPDFReport(): void {
    this.pdfReport = {
      lang: this.lang,
      content: JSON.stringify([this.getPDFContent()]),
      style: this.getCSS(),
      company: localStorage["company_name"],
      address: localStorage["company_address"],
      logo: localStorage["company_logo"],
      orientation: this.loaderComponent.getOrientation(),
      footer: this.footer,
      supervisor: this.loaderComponent.report.approved_by,
      signature: this.loaderComponent.report.signature_path,
      subject: "",
      images: (this.loaderComponent.getImages() == "") ? null : this.loaderComponent.getImages(),
      fontsize: this.loaderComponent.getFontSize()
    }
  }

  public getPDFContent() {
    return {
      header: this.pdfReportHeader(this.report),
      footer: "",
      body: this.loaderComponent.getPDFReportBody().replace(/\n/g, "").replace(/<!--(.*?)-->/g, "").replace(/>( *?)</g, "><").replace(/<tr (.*?)>/g, "<tr>")
    }
  }

  public getCSS() {
    return this.loaderComponent.getCSS()
  }

  public getOrientation() {
    return this.loaderComponent.getOrientation()
  }

  public getFontSize() {
    return this.loaderComponent.getFontSize()
  }

  public pdfReportHeader(report: SuperReportInterface) {
    return "<table><tr><td>" + this.ts.translate("ReportHeader.zone") + ": " + report.zone_name + "<br>" + this.ts.translate("ReportHeader.program") + ": " + report.program_name + "<br>" + this.ts.translate("ReportHeader.module") + ": " + report.module_name + "<br>" + this.ts.translate("ReportHeader.log") + ": " + report.log_name + "</td><td>" + this.ts.translate("ReportHeader.made_on") + ": " + report.creation_date + "<br>" + this.ts.translate("ReportHeader.made_by") + ": " + report.created_by + "<br>" + this.ts.translate("ReportHeader.approved_on") + ": " + report.approval_date + "<br>" + this.ts.translate("ReportHeader.approved_by") + ": " + report.approved_by + "</td></tr></table>"
  }

  public openHTMLReport(): void {
    this.showReport = true
    //this.events.publish("reportEvent", this.report.report_id, Date.now())
    //this.events.$pub("reportEvent", this.report.report_id)
    this.events.$pub("reportEvent", { activeReport: this.report.report_id, time: Date.now() });
  }

  public closeHTMLReport(): void {
    this.showReport = false
    //this.events.publish("reportEvent", "any", Date.now())
    //this.events.$pub("reportEvent", "any")
    this.events.$pub("reportEvent", { activeReport: "any", time: Date.now() });
  }

  public ngOnDestroy(): void {
    /*this.events.unsubscribe("reportEvent", () => {
      console.log("Report Event unsubscribed")
    })*/
    console.log("ngOnDestroy report.loader.ts: " + this.activeReport)
    this.reportEvent.unsubscribe()
  }
}
