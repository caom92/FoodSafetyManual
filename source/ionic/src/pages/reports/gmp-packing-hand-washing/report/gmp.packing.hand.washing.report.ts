import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.hand.washing.report.interface'
import { SuperReport } from '../../super-report/super.report'
import { ReportHeader } from '../../report-header/report.header.interface';

@Component({
  selector: 'gmp-packing-hand-washing-report',
  templateUrl: './gmp.packing.hand.washing.report.html'
})

export class GMPPackingHandWashingReportComponent implements SuperReport, OnInit {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") rep: any
  private header: ReportHeader = {
    zone: "",
    module: "",
    program: "",
    log: "",
    created_on: "",
    created_by: "",
    approved_on: "",
    approved_by: ""
  }

  constructor() {

  }

  ngOnInit() {
    this.header.zone = this.report.zone_name
    this.header.module = this.report.module_name
    this.header.program = this.report.program_name
    this.header.log = this.report.log_name
    this.header.created_on = this.report.creation_date
    this.header.created_by = this.report.created_by
    this.header.approved_on = this.report.approval_date
    this.header.approved_by = this.report.approved_by
  }

  getCSS() {
    return "<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { background-color: #D3D3D3; width: 631px; } .nameColumn { width: 531px; } .approvedColumn { width: 100px; }</style>"
  }

  getPDFReportHeader() {
    return ""
  }

  getPDFReportBody() {
    return this.rep.nativeElement.outerHTML
  }
}