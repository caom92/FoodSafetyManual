import { OnInit, ViewChildren } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { StateService } from '@uirouter/angular'
import { Language } from 'angular-l10n'
import { Observable } from 'rxjs'

import { BackendService } from '../../../services/app.backend'
import { LoaderService } from '../../../services/app.loaders'
import { ToastsService } from '../../../services/app.toasts'
import { ActiveReport, ReportRequest } from '../reports.interface'
import { getDatePickerConfig } from './report-language-config'
import { SuperReportLoader } from './super.report.loader'

export class SuperReportViewer implements OnInit {
  @Language() lang: string
  @ViewChildren('reports') reportList: any
  private dateRangeReport: ReportRequest = { lang: null, content: null, style: null, company: null, address: null, logo: null, orientation: null, footer: null, supervisor: null, signature: null, subject: null, fontsize: null, images: null }
  options: any
  suffix: string = ''
  footer: string = ''
  reports: Array<any> = []
  dateRangeForm: FormGroup
  activeReport: ActiveReport = { id: 'any' }
  
  constructor(private router: StateService,
    public server: BackendService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private toastService: ToastsService) {

  }

  public ngOnInit(): void {
    this.suffix = this.router.current.data.suffix

    this.options = getDatePickerConfig(localStorage.getItem('lang'))

    this.initRequestForm()
  }

  public initRequestForm(): void {
    let startDate: string = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1 < 10) ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()) + '-' + new Date().getDate()
    let endDate: string = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1 < 10) ? '0' + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()) + '-' + new Date().getDate()

    this.dateRangeForm = this.formBuilder.group({
      startDate: [startDate],
      endDate: [endDate]
    })
  }

  public fillRequestForm(): FormData {
    const requestForm = new FormData()

    requestForm.append('start_date', this.dateRangeForm.value.startDate)
    requestForm.append('end_date', this.dateRangeForm.value.endDate)

    return requestForm
  }

  public requestReports(): void {
    console.log(this.dateRangeForm.value)

    const requestForm = this.fillRequestForm()

    const reportLoader = this.loaderService.koiLoader('Recuperando reportes')

    this.server.update(
      'report-' + this.suffix,
      requestForm,
      (response: any) => {
        if (response.meta.return_code == 0) {
          if (response.data) {
            if (response.data.reports.length == 0) {
              this.toastService.showText('noReportsFound')
            } else {
              this.reports = response.data.reports
              this.footer = response.data.pdf_footer
            }
            this.activeReport.id = 'any'
            reportLoader.dismiss()
          }
        } else {
          this.toastService.showText('noReportsFound')
          reportLoader.dismiss()
        }
      },
      (error: any, caught: Observable<void>) => {
        this.toastService.showText('serverUnreachable')
        reportLoader.dismiss()
        return []
      }
    )
  }

  public requestPDFReport(): void {
    let sourceReport: SuperReportLoader = this.reportList._results[0]

    let tempContent = []
    for (let report of this.reportList._results) {
      tempContent.push((report as SuperReportLoader).reportComponent.getPDFContent())
    }

    this.dateRangeReport = {
      lang: this.lang,
      content: JSON.stringify(tempContent),
      style: sourceReport.reportComponent.getCSS(),
      company: localStorage.getItem('company_name'),
      address: localStorage.getItem('company_address'),
      logo: localStorage.getItem('company_logo'),
      orientation: sourceReport.reportComponent.getOrientation(),
      footer: this.footer,
      supervisor: sourceReport.report.approved_by,
      signature: sourceReport.report.signature_path
    }
  }
}