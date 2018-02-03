import { Component, ComponentFactoryResolver, ViewChildren } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { Storage } from '@ionic/storage'
import { Language, TranslationService as TService } from 'angular-l10n'
import { Events, LoadingController, NavController, NavParams } from 'ionic-angular'
import { Observable } from 'rxjs/Rx'

import { DynamicComponentResolver } from '../../app/dynamic.resolver'
import { BackendService } from '../../services/app.backend'
import { TranslationService } from '../../services/app.translation'
import { ReportRequest } from './reports.interface'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private translationService: TranslationService, public events: Events, private storage: Storage, private sanitizer: DomSanitizer, private server: BackendService, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, factoryResolver: ComponentFactoryResolver, public ts: TService) {
    super(factoryResolver)
    events.subscribe("reportEvent", (activeReport, time) => {
      this.activeReport = activeReport
      console.log("reporte activo: " + activeReport)
    })
    this.reportSuffix = this.navParams.get('log_suffix')
  }

  ngOnInit() {
    console.log(this.pdfReports)
  }

  printChildren() {
    console.log(this.pdfReports)
  }

  showChildren() {
    this.pdfReport.lang = this.lang
    //this.pdfReport.content = JSON.stringify([this.getPDFContent()])
    //this.pdfReport.style = this.loaderComponent.getCSS()
    this.pdfReport.company = JSON.parse(localStorage["__mydb/_ionickv/company"])
    this.pdfReport.address = JSON.parse(localStorage["__mydb/_ionickv/address"])
    this.pdfReport.logo = JSON.parse(localStorage["__mydb/_ionickv/logo"])
    this.pdfReport.orientation = "P"
    this.pdfReport.footer = ""
    this.pdfReport.supervisor = this.pdfReports._results[0].report.approved_by
    this.pdfReport.signature = this.pdfReports._results[0].report.signature_path
    this.pdfReport.subject = ""
    this.pdfReport.images = null
    this.pdfReport.fontsize = 10
    //console.log(this.pdfReports)
    let tempContent = []
    for(let report of this.pdfReports._results){
      //console.log(report)
      tempContent.push(report.getPDFContent())
      //report.consoleReport()
    }
    this.pdfReport.content = JSON.stringify(tempContent)
    this.pdfReport.style = this.pdfReports._results[0].getCSS()
  }

  getReportData() {
    let tempLoader = this.presentLoadingCustom()

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
            this.reportFooter = '<table width="100%" ><tr><td width="30%" align="left">Jacobs Farms Delcabo, Inc </td><td width="40%">Pending</td><td width="30%" align="right">Rev. pend</td></tr></table>'
            this.activeReport = "any"
            tempLoader.dismiss()
          }
        } else {
          //this.navCtrl.pop()
          tempLoader.dismiss()
        }
      },
      (error: any, caught: Observable<void>) => {
        //this.toastService.showText("serverUnreachable")
        tempLoader.dismiss()
        //this.navCtrl.pop()
        return []
      }
    )
  }

  presentLoadingCustom() {
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
  }
}