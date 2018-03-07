import { Component, ComponentFactoryResolver, ViewChildren } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
//import { Storage } from '@ionic/storage'
import { Language, TranslationService as TService } from 'angular-l10n'
//import { Events, LoadingController, NavController, NavParams } from 'ionic-angular'
import { Observable } from 'rxjs/Rx'

import { DynamicComponentResolver } from './../dynamic.resolver'
import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'
import { ReportRequest } from './reports.interface'
import { PubSubService } from 'angular2-pubsub';
import { StateService } from '@uirouter/core';

@Component({
  selector: 'report',
  templateUrl: 'reports.html'
})

export class ReportTab extends DynamicComponentResolver {
  @Language() lang: string
  @ViewChildren("reports") pdfReports: any = {
    _results: []
  }
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
  options={
    closeOnSelect: true,
    closeOnClear: false,
    monthsFull: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthsShort: [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep',
      'Oct', 'Nov', 'Dec'
    ],
    weekdaysFull: [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes',
      'Sábado'
    ],
    weekdaysShort: [
      'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
    ],
    weekdaysLetter: [
      'D', 'L', 'M', 'R', 'J', 'V', 'S'
    ],
    today: 'Hoy',
    clear: 'Borrar',
    close: 'Cerrar',
    format: 'dddd, dd mmmm, yyyy',
    formatSubmit: "yyyy-mm-dd",
    selectYears: true,
    selectMonths: true,
  }

  private reportForm: any = null
  loaderComponent: any = null
  startDate: string = ""
  endDate: string = ""
  reportSuffix: string = ""
  reportFooter: string = ""
  reports: Array<any> = []
  activeReport: string = "any"

  dateRangeForm: FormGroup = this.formBuilder.group({
    startDate: [this.startDate],
    endDate: [this.endDate]
  })

  constructor(private translationService: TranslationService, public events: PubSubService, private sanitizer: DomSanitizer, private server: BackendService, private formBuilder: FormBuilder, factoryResolver: ComponentFactoryResolver, public ts: TService, private router: StateService) {
    super(factoryResolver)
    //events.subscribe("reportEvent", (activeReport, time) => {
      //this.activeReport = activeReport
      //console.log("reporte activo: " + activeReport)
    //})
    //this.reportSuffix = this.navParams.get('log_suffix')
    this.reportSuffix = this.router.params.suffix
  }

  ngOnInit() {
    console.log(this.pdfReports)
  }

  printChildren() {
    console.log(this.pdfReports)
  }

  showChildren() {
    this.pdfReport.lang = this.lang
    this.pdfReport.company = localStorage["company_company"]
    this.pdfReport.address = localStorage["company_address"]
    this.pdfReport.logo = localStorage["company_logo"]
    this.pdfReport.orientation = this.pdfReports._results[0].getOrientation()
    this.pdfReport.footer = ""
    this.pdfReport.supervisor = this.pdfReports._results[0].report.approved_by
    this.pdfReport.signature = this.pdfReports._results[0].report.signature_path
    this.pdfReport.subject = ""
    this.pdfReport.images = null
    this.pdfReport.fontsize = this.pdfReports._results[0].getFontSize()
    let tempContent = []
    for(let report of this.pdfReports._results){
      tempContent.push(report.getPDFContent())
    }
    this.pdfReport.content = JSON.stringify(tempContent)
    this.pdfReport.style = this.pdfReports._results[0].getCSS()
    console.log(this.pdfReport)
  }

  getReportData() {
    //let tempLoader = this.presentLoadingCustom()

    let dateRange = new FormData()
    dateRange.append('start_date', this.dateRangeForm.value.startDate)
    dateRange.append('end_date', this.dateRangeForm.value.endDate)

    console.log("Get Report Data")
    this.server.update(
      'report-' + this.reportSuffix,//suffix,
      dateRange,
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            console.log(response.data.reports)
            this.reports = response.data.reports
            this.reportFooter = response.data.pdf_footer
            this.reportFooter = '<table width="100%"><tr><td width="30%" align="left">Jacobs Farms Delcabo, Inc </td><td width="40%">Pending</td><td width="30%" align="right">Rev. pend</td></tr></table>'
            this.activeReport = "any"
            //tempLoader.dismiss()
          }
        } else {
          //this.navCtrl.pop()
          //tempLoader.dismiss()
        }
      },
      (error: any, caught: Observable<void>) => {
        //this.toastService.showText("serverUnreachable")
        //tempLoader.dismiss()
        //this.navCtrl.pop()
        return []
      }
    )
  }

  /*presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div text-center>
          <img class="spinner" src="assets/images/koi_spinner.png" alt="" width="240" height="240">
        </div>
        <div text-center>` + this.ts.translate("Connecting to Server") + `</div>`
    })

    loading.present()

    return loading
  }*/
}