import { Component, ComponentFactoryResolver, OnInit, ViewChildren } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { StateService } from '@uirouter/core'
import { Language, TranslationService as TService } from 'angular-l10n'
import { Observable } from 'rxjs/Rx'

import { BackendService } from '../../services/app.backend'
import { LoaderService } from '../../services/app.loaders'
import { ToastsService } from '../../services/app.toasts'
import { TranslationService } from '../../services/app.translation'
import { DynamicComponentResolver } from './../dynamic.resolver'
import { ActiveReport, ReportRequest } from './reports.interface'

@Component({
  selector: 'report',
  templateUrl: 'reports.html'
})

export class ReportTab extends DynamicComponentResolver implements OnInit {
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
  options = {
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
  startDate: string = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1 < 10) ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()) + '-' + new Date().getDate()
  endDate: string = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1 < 10) ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()) + '-' + new Date().getDate()
  reportSuffix: string = ""
  reportFooter: string = ""
  reports: Array<any> = []
  activeReport: ActiveReport = { id: 'any' }
  documentList: any = null

  dateRangeForm: FormGroup = this.formBuilder.group({
    startDate: [this.startDate],
    endDate: [this.endDate],
    document_id: [null]
  })

  constructor(private translationService: TranslationService,
    private sanitizer: DomSanitizer,
    private server: BackendService,
    private formBuilder: FormBuilder,
    factoryResolver: ComponentFactoryResolver,
    public ts: TService,
    private router: StateService,
    private loaderService: LoaderService,
    private toastService: ToastsService) {
    super(factoryResolver)

  }

  ngOnInit() {
    this.reportSuffix = this.router.params.suffix

    if (this.reportSuffix == 'gmp-doc-control-doc-control') {
      this.server.update(
        'log-gmp-doc-control-doc-control',
        new FormData(),
        (response: any) => {
          this.documentList = response.data.documents
        }
      )
    }
  }

  showChildren() {
    this.pdfReport.lang = this.lang
    this.pdfReport.company = localStorage["company_name"]
    this.pdfReport.address = localStorage["company_address"]
    this.pdfReport.logo = localStorage["company_logo"]
    this.pdfReport.orientation = this.pdfReports._results[0].getOrientation()
    this.pdfReport.footer = this.reportFooter
    this.pdfReport.supervisor = this.pdfReports._results[0].report.approved_by
    this.pdfReport.signature = this.pdfReports._results[0].report.signature_path
    this.pdfReport.subject = ""
    this.pdfReport.images = null
    this.pdfReport.fontsize = this.pdfReports._results[0].getFontSize()
    let tempContent = []
    for (let report of this.pdfReports._results) {
      tempContent.push(report.getPDFContent())
    }
    this.pdfReport.content = JSON.stringify(tempContent)
    this.pdfReport.style = this.pdfReports._results[0].getCSS()
  }

  getReportData() {
    const dateRange = new FormData()
    dateRange.append('start_date', this.dateRangeForm.value.startDate)
    dateRange.append('end_date', this.dateRangeForm.value.endDate)
    if (this.reportSuffix == 'gmp-doc-control-doc-control' && this.dateRangeForm.value.document_id != null) {
      dateRange.append('document_id', this.dateRangeForm.value.document_id)
    }
    const reportLoader = this.loaderService.koiLoader("Recuperando reportes")

    this.server.update(
      'report-' + this.reportSuffix,
      dateRange,
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            if (response.data.reports.length == 0) {
              this.toastService.showText("noReportsFound")
            } else {
              this.reports = response.data.reports
              /*
              //console.log(this.reports)
              //let temp = this.groupBy((this.reports as any).items, "id")
              //console.log('grouped reports')
              let allItems: Array<any> = []
              for (let report of this.reports) {
                for (let item of report.items) {
                  item.creation_date = report.creation_date
                  allItems.push(item)
                }
                //console.log(report.creation_date)
                //console.log(report.items)
              }
              //console.log('end grouped reports')
              //console.log(allItems)
              //console.log(this.groupBy(allItems, 'id'))
              //console.log('end grouped items')
              //console.log(temp)
              console.log('all items')
              console.log(response.data.all_items)
              console.log('end all items')*/
              console.log(response.data.pdf_footer)
              this.reportFooter = response.data.pdf_footer
              this.activeReport.id = 'any'
            }
            this.activeReport.id = 'any'
            reportLoader.dismiss()
          }
        } else {
          this.toastService.showText("noReportsFound")
          reportLoader.dismiss()
        }
      },
      (error: any, caught: Observable<void>) => {
        this.toastService.showText("serverUnreachable")
        reportLoader.dismiss()
        return []
      }
    )
  }

  groupBy(collection, property) {
    var i = 0, val, index,
      values = [], result = []
    for (; i < collection.length; i++) {
      val = collection[i][property]
      index = values.indexOf(val)
      if (index > -1)
        result[index].push(collection[i])
      else {
        values.push(val)
        result.push([collection[i]])
      }
    }
    return result
  }
}