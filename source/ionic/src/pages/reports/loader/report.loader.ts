import { Component, Input, OnDestroy, OnInit, Type, ComponentFactoryResolver } from '@angular/core'
import { Language, TranslationService as TS } from 'angular-l10n'
import { Events } from 'ionic-angular'

import { DynamicComponentResolver } from '../../../app/dynamic.resolver'
import { SuperReportInterface } from '../super-report/super.report.interface'
import { GMPPackingHandWashingReportComponent } from '../gmp-packing-hand-washing/report/gmp.packing.hand.washing.report'
import { GMPPackingPreopReportComponent } from '../gmp-packing-preop/report/gmp.packing.preop.report'
import { GMPPackingScaleCalibrationReportComponent } from '../gmp-packing-scale-calibration/report/gmp.packing.scale.calibration.report'
import { GMPPackingThermoCalibrationReportComponent } from '../gmp-packing-thermo-calibration/report/gmp.packing.thermo.calibration.report'
import { GMPPackingColdRoomTempReportComponent } from '../gmp-packing-cold-room-temp/report/gmp.packing.cold.room.temp.report'
import { GMPPackingGlassBrittleReportComponent } from '../gmp-packing-glass-brittle/report/gmp.packing.glass.brittle.report'
import { GMPPackingScissorsKnivesReportComponent } from '../gmp-packing-scissors-knives/report/gmp.packing.scissors.knives.report'
import { ReportRequest } from '../reports.interface'
import { SuperReportComponent } from '../super-report/super.report'
import { GAPPackingPreopReportComponent } from '../gap-packing-preop/report/gap.packing.preop.report'
import { GMPSelfInspectionPestControlReportComponent } from '../gmp-self-inspection-pest-control/report/gmp.self.inspection.pest.control.report'
import { GMPOthersUnusualOccurrenceReportComponent } from '../gmp-others-unusual-occurrence/report/gmp.others.unusual.occurrence.report'
import { GAPOthersUnusualOccurrenceReportComponent } from '../gap-others-unusual-occurrence/report/gap.others.unusual.occurrence.report'
import { GMPPackingAgedProductReportComponent } from '../gmp-packing-aged-product/report/gmp.packing.aged.product.report'
import { GMPPackingFinishedProductReportComponent } from '../gmp-packing-finished-product/report/gmp.packing.finished.product.report'
import { GMPDocControlDocControlReportComponent } from '../gmp-doc-control-doc-control/report/gmp.doc.control.doc.control.report'

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
  //private loaderComponent: any = null
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
  _reportEventFunction

  constructor(factoryResolver: ComponentFactoryResolver, private events: Events, private ts: TS) {
    super(factoryResolver)
  }

  public ngOnInit(): void {
    this._reportEventFunction = (activeReport, previousReport, origin) => {
      if(origin == this.suffix){
        if(this.activeReport == "any" && activeReport != "any"){
          this.activeReport = activeReport
        } else if (this.activeReport == previousReport && activeReport == "any") {
          this.activeReport = activeReport
        }
      }
    }
    this.events.subscribe("reportEvent", this._reportEventFunction)

    switch (this.suffix) {
      case 'gmp-packing-hand-washing': this.loaderComponent = this.loadComponent(GMPPackingHandWashingReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-packing-preop': this.loaderComponent = this.loadComponent(GMPPackingPreopReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-packing-scale-calibration': this.loaderComponent = this.loadComponent(GMPPackingScaleCalibrationReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-packing-thermo-calibration': this.loaderComponent = this.loadComponent(GMPPackingThermoCalibrationReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-packing-cold-room-temp': this.loaderComponent = this.loadComponent(GMPPackingColdRoomTempReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-packing-glass-brittle': this.loaderComponent = this.loadComponent(GMPPackingGlassBrittleReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-packing-scissors-knives': this.loaderComponent = this.loadComponent(GMPPackingScissorsKnivesReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gap-packing-preop': this.loaderComponent = this.loadComponent(GAPPackingPreopReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-self-inspection-pest-control': this.loaderComponent = this.loadComponent(GMPSelfInspectionPestControlReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-others-unusual-occurrence': this.loaderComponent = this.loadComponent(GMPOthersUnusualOccurrenceReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gap-others-unusual-occurrence': this.loaderComponent = this.loadComponent(GAPOthersUnusualOccurrenceReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-packing-aged-product': this.loaderComponent = this.loadComponent(GMPPackingAgedProductReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-packing-finished-product': this.loaderComponent = this.loadComponent(GMPPackingFinishedProductReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
      case 'gmp-doc-control-doc-control': this.loaderComponent = this.loadComponent(GMPDocControlDocControlReportComponent, {
        report: this.report,
        parent: this
      }).instance
        break
    }
  }

  public printPDFReport(): void {
    this.pdfReport.lang = this.lang
    this.pdfReport.content = JSON.stringify([this.getPDFContent()])
    this.pdfReport.style = this.getCSS()
    this.pdfReport.company = JSON.parse(localStorage["__mydb/_ionickv/company"])
    this.pdfReport.address = JSON.parse(localStorage["__mydb/_ionickv/address"])
    this.pdfReport.logo = JSON.parse(localStorage["__mydb/_ionickv/logo"])
    this.pdfReport.orientation = this.loaderComponent.getOrientation()
    this.pdfReport.footer = this.footer
    this.pdfReport.supervisor = this.loaderComponent.report.approved_by
    this.pdfReport.signature = this.loaderComponent.report.signature_path
    this.pdfReport.subject = ""
    this.pdfReport.images = this.loaderComponent.getImages()
    this.pdfReport.fontsize = this.loaderComponent.getFontSize()
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
    this.events.publish("reportEvent", this.report.report_id, null, this.suffix)
  }

  public closeHTMLReport(): void {
    this.showReport = false
    this.events.publish("reportEvent", "any", this.report.report_id, this.suffix)
  }

  public ngOnDestroy(): void {
    this.events.unsubscribe("reportEvent", this._reportEventFunction)
  }
}
