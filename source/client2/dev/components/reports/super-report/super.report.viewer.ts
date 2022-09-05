import { OnInit, ViewChildren } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Language } from 'angular-l10n'

import { ReportService } from '../../../services/report.service'
import { DateTimeService } from '../../../services/time.service'
import { ActiveReport, ReportRequest } from '../reports.interface'
import { getDatePickerConfig } from './report-language-config'
import { SuperReportLoader } from './super.report.loader'

export class SuperReportViewer implements OnInit {
  @Language() lang: string
  @ViewChildren('reports') reportList: any
  private dateRangeReport: ReportRequest = { lang: null, content: null, style: null, company: null, address: null, logo: null, orientation: null, footer: null, supervisor: null, signature: null, gp_signature: null, subject: null, fontsize: null, images: null }
  options: Pickadate.DateOptions
  suffix: string = ''
  footer: string = ''
  reports: Array<any> = []
  overview: any = null
  dateRangeForm: FormGroup
  activeReport: ActiveReport = { id: 'any' }

  constructor(private routeState: ActivatedRoute,
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private timeService: DateTimeService) {

  }

  public ngOnInit(): void {
    this.routeState.data.subscribe((data) => {
      this.suffix = data.suffix
    })

    this.options = getDatePickerConfig(localStorage.getItem('lang'))

    this.initRequestForm()
  }

  public initRequestForm(): void {
    this.dateRangeForm = this.formBuilder.group({
      start_date: [this.timeService.getISODate()],
      end_date: [this.timeService.getISODate()]
    })
  }

  public onRemoved(id: number) {
    let removeID = this.reports.findIndex((x => x.report_id == id))
    this.reports.splice(removeID, 1)
    this.activeReport.id = 'any'
  }

  public requestReports(): void {
    this.reportService.report(this.suffix, this.dateRangeForm.value).then(success => {
      this.reports = success.reports
      if (success.overview != null) {
        console.log('there is overview')
        this.overview = success.overview
      }
      this.footer = success.pdf_footer
      this.activeReport.id = 'any'
    }, error => {

    })
  }

  public requestPDFReport(): void {
    let sourceReport: SuperReportLoader = this.reportList._results[0]

    let tempContent = []
    for (let report of this.reportList._results) {
      tempContent.push((report as SuperReportLoader).reportComponent.getPDFContent())
    }

    let segmentCSS = ''
    if (sourceReport.reportComponent.segmentCSS() != null) {
      for (let report of this.reportList._results) {
        segmentCSS += ((report as SuperReportLoader).reportComponent.segmentCSS())
      }
    }

    this.dateRangeReport = {
      lang: this.lang,
      content: JSON.stringify(tempContent),
      style: sourceReport.reportComponent.getCSS(segmentCSS),
      company: localStorage.getItem('company_name'),
      address: localStorage.getItem('company_address'),
      logo: localStorage.getItem('company_logo'),
      orientation: sourceReport.reportComponent.getOrientation(),
      footer: this.footer,
      supervisor: sourceReport.report.approved_by,
      signature: sourceReport.report.signature_path,
      gp_supervisor: sourceReport.report.gp_supervisor,
      gp_signature: sourceReport.report.gp_signature_path,
      fontsize: sourceReport.reportComponent.getFontSize()
    }
  }
}